import React from 'react';

// Styles
import styles from'./Label.module.scss'

// Prop-Types
import PropTypes from 'prop-types';

const Label = ({ forType, children}) => {
  return (
    <label className={styles.label} htmlFor={forType}>{ children }</label>
  )
}

Label.propTypes = {
  forType: PropTypes.string,
  children: PropTypes.string,
}


export default Label