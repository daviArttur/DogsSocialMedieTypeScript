import React from 'react';

// Styles
import styles from './PhotoDelete.module.scss';

// Router
import { Link } from 'react-router-dom';

// APi
import { PHOTO_DELETE } from '../../api';

// Context Api
import { UserContext } from '../../UserContext';

// Hooks
import useFetch from '../../Hooks/useFecth';

const PhotoDelete = ({ id, author }) => {
  const { data } = React.useContext(UserContext);
  const { request } = useFetch();

  if (id && author) {
    const token = window.localStorage.getItem('token');
    const navigateToPerfil = `https://dogs.origamid.dev/perfil/${author}`;
    async function handleClick() {
      const confirmUser = window.confirm(
        'Tem certeza que deseja apagar essa foto?',
      );

      if (confirmUser) {
        const { url, options } = PHOTO_DELETE(id, token);
        const { response } = await request(url, options);
        if (response.ok) {
          window.location.reload();
        }
      }
    }

    return data && author === data.username ? (
      <button type="button" onClick={handleClick} className={styles.button}>
        Deletar
      </button>
    ) : (
      <Link
        to={`/user/${author}`}
        className={styles.link}
        style={{ color: 'rgb(51,51,51)' }}
        href={navigateToPerfil}
      >
        @{author}
      </Link>
    );
  }
};

export default PhotoDelete;
