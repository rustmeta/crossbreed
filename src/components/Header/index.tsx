import React, { FC } from 'react'
import { connect } from 'react-redux'
import styles from './Header.module.scss'
import { HeaderMenu } from './HeaderMenu'

interface Props {}

const HeaderComponent: FC<Props> = () => {
  return (
    <div className={styles.container}>
      <span className={styles.spacer} />
      <HeaderMenu />
    </div>
  )
}

export const Header = connect()(HeaderComponent)
