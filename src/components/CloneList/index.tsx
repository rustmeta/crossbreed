import React, { FC, useState } from 'react'
import { yellow } from '@ant-design/colors'
import styles from './CloneList.module.scss'
import { StarFilled, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { List, Card, Button, Checkbox, Popconfirm, Modal } from 'antd'
import { connect } from 'react-redux'
import { RootState } from '../../store/state'
import { Clone, Gene } from '../../models/Clone'
import { GeneInput } from '../GeneInput'
import { GeneList } from '../GeneList'
import {
  addClone,
  selectClone,
  deselectClone,
  deleteClone,
  starClone,
  unstarClone,
} from '../../store/clones/actions'

const { confirm } = Modal

interface Props {
  inventory: Clone[]
  addClone: typeof addClone
  selectClone: typeof selectClone
  deselectClone: typeof deselectClone
  deleteClone: typeof deleteClone
  starClone: typeof starClone
  unstarClone: typeof unstarClone
}

const tabList = [
  {
    key: 'all',
    tab: 'all',
  },
  {
    key: 'fav',
    tab: 'favorites',
  },
]

const CloneListComponent: FC<Props> = ({
  inventory,
  addClone,
  selectClone,
  deselectClone,
  deleteClone,
  starClone,
  unstarClone,
}) => {
  const [addNewClone, setAddNewClone] = useState(emptyClone())
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div className={styles.container}>
      <Card
        title="My clones"
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={setActiveTab}
      >
        <div className={styles.addNewContainer}>
          <GeneInput
            value={addNewClone}
            onChange={(v) => {
              const add = () => {
                setAddNewClone(emptyClone())
                addClone(v)
                setActiveTab('all')
              }

              if (v.filter((g) => g === '').length === 0) {
                const geneString = v.join('')
                const copies = inventory
                  .map((i) => i.genes.join(''))
                  .filter((g) => g === geneString)
                if (copies.length > 0) {
                  confirm({
                    title: `There are already ${copies.length} clones added with same genetics. Are you sure you want to add a copy?`,
                    onOk: add,
                    onCancel: () => {
                      setAddNewClone(emptyClone())
                    },
                  })
                } else {
                  add()
                }

                return
              }

              setAddNewClone(v)
            }}
          />
        </div>
        <List
          size="small"
          dataSource={
            activeTab === 'all'
              ? inventory
              : inventory.filter((c) => c.favorite)
          }
          renderItem={(item) => (
            <List.Item>
              <div className={styles.row}>
                <div className={styles.column}>
                  <Checkbox
                    checked={item.selected}
                    onChange={(e) =>
                      e.target.checked
                        ? selectClone(item.id)
                        : deselectClone(item.id)
                    }
                  />
                </div>
                <div className={styles.column}>
                  <Button
                    type={item.favorite ? 'default' : 'dashed'}
                    onClick={() => {
                      if (item.favorite) {
                        unstarClone(item.id)
                      } else {
                        starClone(item.id)
                      }
                    }}
                    icon={
                      item.favorite ? (
                        <StarFilled style={{ color: yellow.primary }} />
                      ) : (
                        <StarOutlined />
                      )
                    }
                    shape="circle"
                  />
                </div>
                <GeneList size="small" genes={item.genes} />
                <div className={styles.spacer} />
                <Popconfirm
                  placement={'topLeft'}
                  title="Are you sure? this cannot be undone"
                  onConfirm={() => deleteClone(item.id)}
                >
                  <Button shape="circle" icon={<DeleteOutlined />} />
                </Popconfirm>
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  inventory: state.clones.inventory,
})

const mapDispatch = {
  addClone,
  selectClone,
  deselectClone,
  deleteClone,
  starClone,
  unstarClone,
}

export const CloneList = connect(
  mapStateToProps,
  mapDispatch
)(CloneListComponent)

const emptyClone = (): Gene[] => ['', '', '', '', '', '']
