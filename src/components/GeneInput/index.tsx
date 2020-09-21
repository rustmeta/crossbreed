import React, { FC, useRef, useState } from 'react'
import styles from './GeneInput.module.scss'
import classnames from 'classnames'

const KEYCODE_BACKSPACE = 8

interface Props {
  initialValue?: string[]
  value?: string[]
  onChange?: (value: string[]) => void
  disabled?: boolean
}

export const GeneInput: FC<Props> = ({
  onChange,
  initialValue,
  value,
  disabled,
}) => {
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]
  const [values, setValues] = useState(
    initialValue ? initialValue : ['', '', '', '', '', '']
  )

  const realValue: string[] = value ? value : values

  if (value && value.filter((v) => v !== '').length === 0) {
    refs[0].current && (refs[0].current as any).focus()
  }

  function setValue(i: number, value: string) {
    if (disabled) return

    const newValues = realValue.slice()
    newValues[i] = value
    if (!value) setValues(newValues)
    onChange && onChange(newValues)
  }

  return (
    <div className={styles.container}>
      {refs.map((ref, i) => (
        <div key={i} data-gene={realValue[i]} className={styles.geneContainer}>
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
                setValue(i - 1, '')
                refs[i - 1].current && (refs[i - 1].current as any).focus()
              }
            }}
            onChange={(e) => {
              const value = e.target.value.toUpperCase()
              if (allowedGenes.includes(value) || value === '') {
                setValue(i, value)

                if (value !== '' && i !== 5) {
                  const nextRef = refs[i + 1]
                  if (nextRef.current !== null) {
                    ;(nextRef.current as any).focus()
                  }
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
