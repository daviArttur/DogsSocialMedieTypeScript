import React from 'react';

// Styles
import styles from'./Label.module.scss'

type PropType = {
  forType: string,
  children: string
}

const Label = ({ forType, children}: PropType) => {
  return (
    <label className={styles.label} htmlFor={forType}>{ children }</label>
  )
}

export default Label