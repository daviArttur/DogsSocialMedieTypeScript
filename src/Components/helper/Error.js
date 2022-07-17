import React from 'react';

//Styles
import styles from './Error.module.scss';

const Error = ({ error, children }) => {
  if (!error) return null;
  return <span className={styles.error}>{children}</span>;
};

export default Error;
