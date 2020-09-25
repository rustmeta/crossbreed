import React, { FC } from 'react'
import { isUndefined } from 'lodash'
import styles from './FlexCard.module.scss'
import classNames from 'classnames'

interface Props {
  title: string
  tabs?: React.ReactNode
  extras?: React.ReactNode
}

export const FlexCard: FC<Props> = ({ children, tabs, title, extras }) => {
  const hasTabs = !isUndefined(tabs)
  const hasExtras = !isUndefined(extras)

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        {hasTabs && <div className={styles.tabs}>{tabs}</div>}
        {hasExtras && (
          <div
            className={classNames(styles.extras, {
              [styles.extrasBorder]: hasTabs,
            })}
          >
            {extras}
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.inner}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  )
}
