import React from 'react';

// Victory
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';

// Api
import { PHOTOS_GET } from '../../api';

// Hooks
import useFetch from '../../Hooks/useFecth';

// Helper
import Loading from '.././helper/Loading';

// Styles
import styles from './UserStats.module.scss';

const UserStats = ({ user }) => {
  const { loading, request } = useFetch();
  const [photos, setPhotos] = React.useState(null);
  const [views, setViews] = React.useState([0]);

  React.useEffect(() => {
    async function getPhotos() {
      const { url, endpoint } = PHOTOS_GET({
        page: 0,
        total: 999,
        user: user,
      });
      const { json } = await request(url, endpoint);

      setPhotos(
        json.map((photo) => {
          return { x: photo.title, y: Number(photo.acessos) };
        }),
      );
      setViews(
        json.map(({ acessos }) => Number(acessos)).reduce((a, b) => a + b),
      );
    }
    getPhotos();
  }, [request, user]);

  if (loading) return <Loading />;
  if (photos)
    return (
      <div>
        <section className={styles.views}>
          <h2>Acessos: {views}</h2>
        </section>

        <div className={styles.container}>
          <div className={styles.graph}>
            <VictoryChart
              height={400}
              width={400}
              domainPadding={{ x: 30, y: [20, 20] }}
              style={{ fill: '#333' }}
            >
              <VictoryBar data={[...photos]} />
            </VictoryChart>
          </div>

          <div className={styles.graph}>
            <VictoryPie
              style={{ labels: { fill: '#333', fontSize: 14 } }}
              padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
              data={[...photos]}
            />
          </div>
        </div>
      </div>
    );
};

export default UserStats;
