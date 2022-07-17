import React from 'react';

//Router
import { Link } from 'react-router-dom';

// Styles
import styles from './Header.module.scss';

// Context Api
import { UserContext } from '../UserContext';

// Components
import { ReactComponent as Dogs } from '../Assets/dogs.svg';

const Header = () => {
  const { data } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav + ' container'}>
        <Link to="/">
          <Dogs />
        </Link>

        <section className={styles.navLinks}>
          {data ? (
            <>
              <p>{ data ? data.nome : 'Login / Criar'}</p>
            </>
          ) : (
            <Link to="/login"> Login / Criar </Link>
          )}
          <Link
            to={data ? '/mypage/feed' : '/login'}
            className={styles.login}
          ></Link>
        </section>
      </nav>
    </header>
  );
};

export default Header;
