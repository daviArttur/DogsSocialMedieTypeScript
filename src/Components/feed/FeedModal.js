import React from 'react';

// Api
import { PHOTO_GET } from '../../api';

// Styles
import styles from './FeedModal.module.scss';

// Router
import { ReactComponent as Views } from '../../Assets/visualizacao-black.svg';
import { Link } from 'react-router-dom';

// Components
import Loading from '.././helper/Loading';
import PhotoComment from '../photo/PhotoComment';
import PhotoDelete from '../photo/PhotoDelete';

// Hooks
import useFetch from '../../Hooks/useFecth';

const FeedModal = ({ photoSelect, setPhotoSelect }) => {
  const { data, loading, request } = useFetch();
  React.useEffect(() => {
    async function callPhoto() {
      const { url, options } = PHOTO_GET(photoSelect);
      await request(url, options);
    }
    callPhoto();
  }, [request, photoSelect]);

  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) setPhotoSelect(null);
  }

  if (loading) return <Loading />;

  if (data)
    return (
      <div className={styles.container} onClick={handleOutsideClick}>
        <section className={styles.containerData}>
          <img src={data.photo.src} alt="" className={styles.img} />

          <div className={styles.containerFlex}>
            <section className={styles.containerInfo}>
              <div className={styles.userAndViews}>
                <div className={styles.authorAndViews}>
                  <PhotoDelete id={data.photo.id} author={data.photo.author} />

                  <p>
                    <Views className={styles.views} />
                    {data.photo.acessos}
                  </p>
                </div>

                <div className={styles.nameDog}>
                  <Link to={`/Photo/${data.photo.id}`}>
                    <h2 className={styles.title}> {data.photo.title} </h2>
                  </Link>
                </div>

                <ul className={styles.bio}>
                  <li>{data.photo.peso} kg</li>
                  <li>{data.photo.idade} anos</li>
                </ul>
              </div>
            </section>

            <section className={styles.containerComment}>
              <PhotoComment data={data} />
            </section>
          </div>
        </section>
      </div>
    );
};

export default FeedModal;
