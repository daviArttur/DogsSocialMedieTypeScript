import React from 'react';

// Styles
import styles from'./Button.module.scss';

// Prop-Types
import PropTypes from 'prop-types';

const Button = ({ paramOnClick, loading, children, style, disabled }) => {

  return (
    <button
      disabled={loading || disabled}
      className={styles.button}
      type='button'
      onClick={paramOnClick}
      style={style}
    > {children} </button>
  )
}

Button.propTypes = {
  paramOnClick: PropTypes.func,
  loading: PropTypes.bool
}

export default Button