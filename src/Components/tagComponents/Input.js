import React from 'react';

// Styles
import styles from './Input.module.scss'

// Prop-Types
import PropTypes from 'prop-types';

const Input = ({type, id, value, onChange, onBlur, error}) => {
  return (
    <>
      <input
        className={styles.input} 
        type={type} 
        id={id} 
        onChange={onChange}
        onBlur={onBlur}
        value={value} 
      />
      {error && <p className={styles.error}>{error}</p>}
    </>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
}


export default Input