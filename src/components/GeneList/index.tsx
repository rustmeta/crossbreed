import React, { FC } from 'react'
import styles from './GeneList.module.scss'

const sizes = {
  small: {
    size: 30,
    fontSize: 12,
  },
  large: {
    size: 40,
    fontSize: 16,
  },
}

interface Props {
  genes: string[]
  size?: 'small' | 'large'
  hideEmpty?: boolean
}

export const GeneList: FC<Props> = ({ genes, size = 'large', hideEmpty }) => {
  const sizeObj = sizes[size]

  return (
    <div className={styles.container}>
      {genes.map((g, i) => (
        <div
          style={{
            backgroundColor: !g && hideEmpty ? 'transparent' : undefined,
            width: sizeObj.size,
            height: sizeObj.size,
            fontSize: sizeObj.fontSize,
          }}
          key={i}
          data-gene={g}
          className={styles.gene}
        >
          {g}
        </div>
      ))}
    </div>
  )
}
