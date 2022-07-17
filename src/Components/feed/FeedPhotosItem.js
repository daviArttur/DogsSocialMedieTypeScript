import React from 'react';

// Styles
import styles from './FeedPhotosItem.module.scss';

const FeedPhotosItem = ({ photo, setPhotoSelect }) => {
  return (
    <li
      key={photo.id}
      className={styles.img}
      onClick={() => setPhotoSelect(photo.id)}
    >
      <img src={photo.src} className={styles} alt="Foto de um cachorro" />
      <span className={styles.acessos}> {photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
