import React, { FC, useRef, useState } from 'react'
import styles from './GeneInput.module.scss'
import classnames from 'classnames'

const KEYCODE_BACKSPACE = 8

interface Props {
  initialValue?: string[]
  onChange: (value: string[]) => void
}

export const GeneInput: FC<Props> = ({ onChange, initialValue }) => {
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

  function setValue(i: number, value: string) {
    const newValues = values.slice()
    newValues[i] = value
    setValues(newValues)
    onChange(newValues)
  }

  return (
    <div className={styles.container}>
      {refs.map((ref, i) => (
        <div key={i} data-gene={values[i]} className={styles.geneContainer}>
          <input
            ref={ref}
            className={classnames(styles.geneInput, {
              [styles.hasValue]: !!values[i],
            })}
            value={values[i]}
            onKeyDown={(e: any) => {
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
