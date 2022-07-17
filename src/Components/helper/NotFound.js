import React from 'react';

// Styles
import stylesGlobal from '../../App.module.scss';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <section className={stylesGlobal.container && styles.container}>
      <div>
        <h1 className={stylesGlobal.title}>Erro: 404</h1>
        <p>Página não encontrada</p>
      </div>
    </section>
  );
};

export default NotFound;
