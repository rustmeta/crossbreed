import React, { Component } from 'react'
import styles from './Table.module.scss'
import { GeneInput } from '../GeneInput'
import classNames from 'classnames'
import { crossbreed } from '../../lib/crossbreed'

interface Props {}

interface State {
  clones: string[][]
  addNewValue: string[]
  validationError: string | null
}

export class Table extends Component<Props, State> {
  state: State = {
    clones: localStorage.getItem('clones')
      ? JSON.parse(localStorage.getItem('clones') as string)
      : [],
    addNewValue: newEmpty(),
    validationError: null,
  }

  addNewOnChange = (genes: string[]) => {
    console.info('onChange', genes)
    if (genes.filter((g) => g !== '').length === 6) {
      const newClones = this.state.clones.slice()
      newClones.push(genes)
      this.setState({
        clones: newClones,
        addNewValue: newEmpty(),
      })

      this.save(newClones)
    } else {
      this.setState({
        addNewValue: genes,
      })
    }
  }

  save(clones: string[][]) {
    localStorage.setItem('clones', JSON.stringify(clones))
  }

  getResult() {
    if (this.state.clones.length === 0) {
      return newEmpty()
    }

    return crossbreed(this.state.clones)
  }

  removeRow(row: number) {
    const newClones = this.state.clones.slice()
    newClones.splice(row, 1)
    this.setState({
      clones: newClones,
    })

    this.save(newClones)
  }

  renderResult() {
    const result = this.getResult()
    const rows = result.reduce(
      (value, gene) => (gene.length > value ? gene.length : value),
      0
    )

    let arr = []
    for (let i = 0; i < rows; i++) {
      arr.push(
        <div key={i} className={styles.row}>
          <GeneInput
            disabled
            value={result.map((g) => {
              return g.length > i ? g[i] : ''
            })}
          />
        </div>
      )
    }

    return arr
  }

  render() {
    const { clones, validationError, addNewValue } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.rows}>
          {clones.map((clone, i) => (
            <div key={i} className={styles.row}>
              <GeneInput disabled initialValue={clone} onChange={() => {}} />

              <button onClick={() => this.removeRow(i)}>x</button>
            </div>
          ))}
        </div>
        <div className={classNames(styles.addNew, styles.row)}>
          <GeneInput value={addNewValue} onChange={this.addNewOnChange} />
        </div>

        <div className={styles.result}>
          {validationError && (
            <div className={styles.validationError}>{validationError}</div>
          )}

          {/* <GeneInput
            disabled
            value={validationError ? newEmpty() : this.getResult()}
          /> */}
          {this.renderResult()}
        </div>
      </div>
    )
  }
}

const newEmpty = () => ['', '', '', '', '', '']
