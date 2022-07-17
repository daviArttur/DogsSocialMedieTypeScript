import React, { MouseEventHandler } from 'react';

// Styles
import styles from'./Button.module.scss';

// Prop-Types
import PropTypes from 'prop-types';

type PropTypes = {
  paramOnClick: MouseEventHandler<HTMLButtonElement>,
  loading: boolean,
  children: string,
  style: React.CSSProperties,
  disabled?: boolean
}

const Button = ({ paramOnClick, loading, children, style, disabled }: PropTypes) => {

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


export default Button