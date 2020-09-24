import React, { FC } from 'react'
import styles from './Crossbreed.module.scss'
import { List, Button } from 'antd'
import { connect } from 'react-redux'
import { RootState } from '../../store/state'
import { Clone, Gene } from '../../models/Clone'
import { GeneList } from '../GeneList'
import { countSeeds, crossbreed } from '../../lib/crossbreed'
import {
  CloseOutlined,
  EnterOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { changeAmountClone } from '../../store/clones/actions'
import { ThunkDispatch } from 'redux-thunk'
import { FlexCard } from '../FlexCard'

interface Props {
  clones: Clone[]
}

interface Dispatch {
  dispatch: ThunkDispatch<any, any, any>
}

const CrossbreedComponent: FC<Props & Dispatch> = ({ clones, dispatch }) => {
  function renderResult(clones: Clone[]) {
    if (clones.length === 0) {
      return
    }

    const result = crossbreed(clones.map((c) => c.genes))
    const rows = result.reduce(
      (value, gene) => (gene.length > value ? gene.length : value),
      0
    )

    let arr = []
    for (let i = 0; i < rows; i++) {
      arr.push(
        <div key={i} className={styles.row}>
          <GeneList
            size="small"
            hideEmpty
            genes={
              result.map((g) => {
                return g.length > i ? g[i] : ''
              }) as Gene[]
            }
          />
        </div>
      )
    }

    return arr
  }

  const extendedClones = extendClones(clones)

  return (
    <FlexCard title={`Crossbreeding (${countSeeds(clones)} seeds)`}>
      <div className={styles.text}>
        Crossbreed one random seed with the following clones:
      </div>
      <List
        dataSource={extendedClones}
        renderItem={(item) => {
          const isCopy = item.id === ''

          return (
            <List.Item className={styles.listItem}>
              <div className={styles.row}>
                <div className={styles.column}>
                  <GeneList size="small" genes={item.genes} />
                </div>
                <div className={styles.column}>
                  {isCopy ? <EnterOutlined /> : <CloseOutlined />}
                </div>
                <div className={styles.column}>
                  <span className={styles.times}>
                    {isCopy
                      ? null
                      : item.selectedAmount
                      ? item.selectedAmount
                      : 1}
                  </span>
                </div>
                <div className={styles.column}>
                  {!isCopy && (
                    <div className={styles.amountModifiers}>
                      <Button
                        size="small"
                        shape="circle"
                        onClick={() =>
                          dispatch(
                            changeAmountClone(
                              item.id,
                              item.selectedAmount ? item.selectedAmount + 1 : 2
                            )
                          )
                        }
                        icon={<PlusOutlined />}
                      />
                      <Button
                        size="small"
                        shape="circle"
                        onClick={() =>
                          changeAmountClone(
                            item.id,
                            item.selectedAmount ? item.selectedAmount - 1 : 1
                          )
                        }
                        icon={<MinusOutlined />}
                      />
                    </div>
                  )}
                </div>
              </div>
            </List.Item>
          )
        }}
      />
      <div className={styles.resultRow}>
        <div className={styles.text}>Outcome:</div>
        <List>
          <List.Item>
            <div className={styles.result}>{renderResult(extendedClones)}</div>
          </List.Item>
        </List>
      </div>
    </FlexCard>
  )
}

function extendClones(clones: Clone[]) {
  const newClones = clones.slice()
  for (let i = 0; i < newClones.length; i++) {
    const clone = newClones[i]
    if (clone.selectedAmount && clone.selectedAmount > 1) {
      for (let j = 0; j < clone.selectedAmount - 1; j++) {
        newClones.splice(i + 1, 0, copyClone(clone))
        i++
      }
    }
  }

  return newClones
}

function copyClone(clone: Clone) {
  return {
    id: '',
    genes: clone.genes,
    selected: true,
    selectedAmount: 0,
  } as Clone
}

const mapStateToProps = (state: RootState) => ({
  clones: state.clones.pages[state.pages.activePage].inventory.filter(
    (c) => c.selected
  ),
})

export const Crossbreed = connect(mapStateToProps)(CrossbreedComponent)
