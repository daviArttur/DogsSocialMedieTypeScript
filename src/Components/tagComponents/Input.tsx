import React, { ChangeEventHandler, FocusEventHandler } from 'react';

// Styles
import styles from './Input.module.scss'

type PropTypes = {
  type: 'text' | 'password' | 'email',
  id: string,
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  onBlur: FocusEventHandler<HTMLInputElement>,
  error: boolean | null
}

const Input = ({type, id, value, onChange, onBlur, error}: PropTypes) => {
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

export default Input