import React, { FC } from 'react'
import styles from './Footer.module.scss'

interface Props {}

export const Footer: FC<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.madeBy}>
        <span>
          Made by{' '}
          <a href="https://steamcommunity.com/profiles/76561198011675847/">
            Malmø
          </a>
        </span>
      </div>
    </div>
  )
}
