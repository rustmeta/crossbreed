import React, { FC } from 'react'
import styles from './Layout.module.scss'

interface Props {}

export const Layout: FC<Props> = () => {
  return <div className={styles.container}></div>
}
