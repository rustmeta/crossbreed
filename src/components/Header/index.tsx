import { EllipsisOutlined } from '@ant-design/icons'
import React, { FC } from 'react'
import styles from './Header.module.scss'
import { HeaderMenu } from './HeaderMenu'

interface Props {}

export const Header: FC<Props> = ({}) => {
  return (
    <div className={styles.container}>
      <span className={styles.spacer} />
      <HeaderMenu />
    </div>
  )
}
