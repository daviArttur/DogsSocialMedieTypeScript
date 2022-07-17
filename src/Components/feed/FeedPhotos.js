import React from 'react';

// Hooks
import useFetch from '../../Hooks/useFecth';

// Api
import { PHOTOS_GET } from '../../api';

// Styles
import styles from './FeedPhotos.module.scss';

// Components
import FeedPhotosItem from './FeedPhotosItem';

// Helper
import Error from '../helper/Error';
import Loading from '../helper/Loading';

const FeedPhotos = ({ setPhotoSelect, page, total, user, setInfinite }) => {
  const [photos, setPhotos] = React.useState(null);
  const { loading, error, request } = useFetch();

  React.useEffect(() => {
    async function getPhotos() {
      const { url, endpoint } = PHOTOS_GET({
        page: page,
        total: total,
        user: user,
      });
      const { response, json } = await request(url, endpoint);

      if (response && response.ok && json.length < total) {
        setInfinite(false);
      }
      setPhotos(json);
    }
    getPhotos();
  }, [request, page, total, user, setInfinite]);

  if (loading && page === 1) return <Loading />;
  if (error) return <Error />;

  return (
    <section className={styles.container}>
      {photos &&
        photos.map((item) => (
          <FeedPhotosItem
            key={item.id}
            className={styles.img}
            photo={item}
            setPhotoSelect={setPhotoSelect}
          />
        ))}

      <Error error={error}>Um error aconteceu</Error>
    </section>
  );
};

export default FeedPhotos;
