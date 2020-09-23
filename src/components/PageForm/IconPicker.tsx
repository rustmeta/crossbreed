import classNames from 'classnames'
import React, { FC } from 'react'
import styles from './IconPicker.module.scss'
import { pageIcons, pageIconsTitle } from '../../models/Page'
import { Tooltip } from 'antd'

interface Props {
  onChange: (key: string) => void
  value: string
}

export const IconPicker: FC<Props> = ({ onChange, value }) => {
  return (
    <div className={styles.iconPicker}>
      {Object.keys(pageIcons).map((key) => (
        <Tooltip title={pageIconsTitle[key]}>
          <div
            onClick={() => onChange(key)}
            className={classNames(styles.icon, {
              [styles.selected]: key === value,
            })}
          >
            <img src={pageIcons[key]} alt={key} key={key} />
          </div>
        </Tooltip>
      ))}
    </div>
  )
}
