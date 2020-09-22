import React, { FC } from 'react'
import styles from './Crossbreed.module.scss'
import { List, Card, Button } from 'antd'
import { connect } from 'react-redux'
import { RootState } from '../../store/state'
import { Clone, Gene } from '../../models/Clone'
import { GeneList } from '../GeneList'
import { crossbreed } from '../../lib/crossbreed'
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { changeAmountClone } from '../../store/clones/actions'

interface Props {
  clones: Clone[]
  changeAmountClone: typeof changeAmountClone
}

const CrossbreedComponent: FC<Props> = ({ clones, changeAmountClone }) => {
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

  return (
    <div className={styles.container}>
      <Card title="Crossbreeding">
        <List
          dataSource={clones}
          renderItem={(item) => (
            <List.Item className={styles.listItem}>
              <div className={styles.row}>
                <div className={styles.column}>
                  <GeneList size="small" genes={item.genes} />
                </div>
                <div className={styles.column}>
                  <CloseOutlined />
                </div>
                <div className={styles.column}>
                  <span className={styles.times}>
                    {item.selectedAmount ? item.selectedAmount : 1}
                  </span>
                </div>
                <div className={styles.column}>
                  <div className={styles.amountModifiers}>
                    <Button
                      size="small"
                      shape="circle"
                      onClick={() =>
                        changeAmountClone(
                          item.id,
                          item.selectedAmount ? item.selectedAmount + 1 : 2
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

const mapStateToProps = (state: RootState) => ({
  clones: state.clones.inventory.filter((c) => c.selected),
})

const mapDispatch = {
  changeAmountClone,
}

export const Crossbreed = connect(
  mapStateToProps,
  mapDispatch
)(CrossbreedComponent)
