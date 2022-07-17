import React from 'react';

// Styles
import styles from './PhotoContent.module.scss';

// Router
import { Link } from 'react-router-dom';

// Helper
import Loading from '../helper/Loading';
import Error from '../helper/Error';

// Components
import { ReactComponent as Views } from '../../Assets/visualizacao-black.svg';
import PhotoComment from './PhotoComment';
import PhotoDelete from './PhotoDelete';

// APi
import { PHOTO_GET } from '../../api';

// Hooks
import useFetch from '../../Hooks/useFecth';

const PhotoContent = ({ id, single }) => {
  const { data, error, loading, request } = useFetch();
  React.useEffect(() => {
    async function callPhoto() {
      const { url, options } = PHOTO_GET(id);
      await request(url, options);
    }
    callPhoto();
  }, [request, id]);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (data)
    return (
      <div className={`${styles.container} ${single ? styles.single : ''}`}>
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

                <section className={styles.containerComment}>
                  <PhotoComment data={data} />
                </section>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
};

export default PhotoContent;
