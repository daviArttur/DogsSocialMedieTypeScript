import React, { useRef } from 'react';

// Styles
import styles from '../../App.module.scss';

// Components
import FeedModal from './FeedModal';
import FeedPhotos from './FeedPhotos';

const Feed = ({ user }) => {
  const [photoSelect, setPhotoSelect] = React.useState(null);
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);
  const wait = useRef(false)
  React.useEffect(() => {

    function handleScroll() {
      if (infinite) {
        const height =
          document.body.offsetHeight - document.documentElement.clientHeight;
        const scroll = window.scrollY;
        if (scroll > height * 0.85 && !wait.current) {
          wait.current = true;
          setPages(() => [...pages, pages.length + 1]);
          setTimeout(() => (wait.current = false), 500);
        }
      }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
    };
  }, [pages, infinite]);

  return (
    <section className={styles.container} style={{ marginTop: '1rem' }}>
      {photoSelect && (
        <FeedModal photoSelect={photoSelect} setPhotoSelect={setPhotoSelect} />
      )}

      {pages.map((index) => {
        return (
          <FeedPhotos
            verifyLoading={pages}
            key={index}
            setPhotoSelect={setPhotoSelect}
            page={index}
            setInfinite={setInfinite}
            total={6}
            user={user}
          />
        );
      })}
    </section>
  );
};

export default Feed;
