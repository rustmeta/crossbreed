import React, { FC } from 'react'
import styles from './Layout.module.scss'
import { Crossbreed } from '../Crossbreed'
import { CloneList } from '../CloneList'

interface Props {}

export const Layout: FC<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Crossbreed />
      </div>
      <div className={styles.right}>
        <CloneList />
      </div>
    </div>
  )
}
