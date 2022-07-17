import React from 'react';

// Context Api
import { UserContext } from '../../UserContext';

// Router
import { NavLink, useLocation } from 'react-router-dom';

// Components
import { ReactComponent as Myphoto } from '../../Assets/feed.svg';
import { ReactComponent as Statistics } from '../../Assets/estatisticas.svg';
import { ReactComponent as Add } from '../../Assets/adicionar.svg';
import { ReactComponent as Logout } from '../../Assets/sair.svg';

// Styles
import styles from './UserHeaderNav.module.scss';

// Hooks
import useMedia from '../../Hooks/useMedia';

const UserHeaderNav = () => {
  const media = useMedia('(max-width: 40rem)');
  const [openMenu, setOpenMenu] = React.useState(false);
  const { userLogout } = React.useContext(UserContext);
  const { pathname } = useLocation();

  React.useEffect(() => {
    setOpenMenu(false);
  }, [pathname]);

  function handleChangeMenu() {
    setOpenMenu(!openMenu);
  }
  return (
    <>
      {media && (
        <button
          className={`${styles.button} ${openMenu && styles.active}`}
          onClick={handleChangeMenu}
        ></button>
      )}
      <nav
        className={`${media ? styles.mobile : styles.nav} ${
          openMenu && styles.visible
        }`}
      >
        <NavLink to="/mypage/feed" end>
          <Myphoto />
          {media && 'Minhas Fotos'}
        </NavLink>

        <NavLink to="/mypage/statistics">
          <Statistics />
          {media && 'Estatísticas'}
        </NavLink>

        <NavLink to="/mypage/post">
          <Add />
          {media && 'Postar'}
        </NavLink>
        <button onClick={userLogout} className={styles.buttonLogout}>
          <Logout />
          {media && 'Sair'}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
