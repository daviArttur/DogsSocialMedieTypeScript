import React from 'react';

// Routes
import { Routes, Route, Navigate } from 'react-router-dom';

// Styles
import styles from './Login.module.scss';

//Context Api
import { UserContext } from '../../UserContext';

// Helper
import NotFound from '../helper/NotFound';

// Components
import Form from './LoginForm';
import LoginReset from './LoginReset';
import LoginLost from './LoginLost';
import Cadastry from './LoginCadastry';

const Login = () => {
  const { login } = React.useContext(UserContext);
  if (login === true) return <Navigate to="/mypage/feed" />;

  return (
    <section className={styles.login}>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="cadastry" element={<Cadastry />} />
        <Route path="lost" element={<LoginLost />} />
        <Route path="reset" element={<LoginReset />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default Login;
