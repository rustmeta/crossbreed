import React, { FC } from 'react'
import styles from './Crossbreed.module.scss'
import { List, Card } from 'antd'
import { connect } from 'react-redux'
import { RootState } from '../../store/state'
import { Clone, Gene } from '../../models/Clone'
import { GeneList } from '../GeneList'
import { crossbreed } from '../../lib/crossbreed'

interface Props {
  clones: Clone[]
}

const CrossbreedComponent: FC<Props> = ({ clones }) => {
  return (
    <div className={styles.container}>
      <Card title="Crossbreeding">
        <List
          dataSource={clones}
          renderItem={(item) => (
            <List.Item>
              <div className={styles.row}>
                <div className={styles.column}>
                  <GeneList genes={item.genes} />
                </div>
              </div>
            </List.Item>
          )}
        />
        <div className={styles.resultRow}>{renderResult(clones)}</div>
      </Card>
    </div>
  )
}

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

const mapStateToProps = (state: RootState) => ({
  clones: state.clones.inventory.filter((c) => c.selected),
})

export const Crossbreed = connect(mapStateToProps)(CrossbreedComponent)
