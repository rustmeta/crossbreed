import React, { FC } from 'react'
import styles from './Footer.module.scss'
import preval from 'preval.macro'
const pkg = require('../../../package.json') as { version: string }

interface Props {}

const buildDate = new Date(preval`module.exports = new Date();`)

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
      <div className={styles.spacer} />
      <span>
        v{pkg.version} ({buildDate.toLocaleDateString()})
      </span>
    </div>
  )
}
