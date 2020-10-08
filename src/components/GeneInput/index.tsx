import React, { FC, useRef, useState } from 'react'
import styles from './GeneInput.module.scss'
import classnames from 'classnames'
import { Gene } from '../../models/Clone'
import { green, red } from '@ant-design/colors'

const KEYCODE_BACKSPACE = 8

interface Props {
  initialValue?: Gene[]
  value?: Gene[]
  onChange?: (value: Gene[]) => void
  disabled?: boolean
  singleMode?: boolean
}

const colors = {
  bad: red.primary,
  good: green.primary,
}

export const GeneInput: FC<Props> = ({
  onChange,
  initialValue,
  value,
  disabled,
  singleMode,
}) => {
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  const [values, setValues] = useState<Gene[]>(
    initialValue ? initialValue : ['', '', '', '', '', '']
  )

  const realValue: Gene[] = value ? value : values

  // if (!singleMode && value && value.filter((v) => v !== '').length === 0) {
  //   refs[0].current && (refs[0].current as any).focus()
  // }

  function setValue(i: number, value: Gene) {
    if (disabled) return

    const newValues = realValue.slice()
    newValues[i] = value
    if (!value) setValues(newValues)
    onChange && onChange(newValues)
  }

  return (
    <div className={styles.container}>
      {refs.map((ref, i) => (
        <div
          key={i}
          style={{
            backgroundColor: realValue[i]
              ? colors[['W', 'X'].includes(realValue[i]) ? 'bad' : 'good']
              : '#303030',
          }}
          className={styles.geneContainer}
        >
          <input
            ref={ref}
            className={classnames(styles.geneInput, {
              [styles.hasValue]: !!realValue[i],
            })}
            disabled={disabled}
            value={realValue[i]}
            onKeyDown={(e: any) => {
              if (disabled) return
              if (e.which !== KEYCODE_BACKSPACE) {
                return
              }

              const value = e.target.value.toUpperCase() as string
              if (value === '' && i !== 0) {
                if (!singleMode) {
                  setValue(i - 1, '')
                  refs[i - 1].current && (refs[i - 1].current as any).focus()
                }
              }
            }}
            onChange={(e) => {
              const value = e.target.value.toUpperCase() as Gene
              if (allowedGenes.includes(value) || value === '') {
                setValue(i, value)

                if (!singleMode && value !== '' && i !== 5) {
                  const nextRef = refs[i + 1]
                  if (nextRef.current !== null) {
                    ;(nextRef.current as any).focus()
                  }
                } else if (!singleMode && i === 5) {
                  refs[0].current && (refs[0].current as any).focus()
                }
              }
            }}
          />
        </div>
      ))}
    </div>
  )
}

const allowedGenes = ['Y', 'G', 'H', 'W', 'X']
