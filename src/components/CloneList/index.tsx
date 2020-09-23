import React, { FC, useState } from 'react'
import { yellow } from '@ant-design/colors'
import styles from './CloneList.module.scss'
import {
  StarFilled,
  StarOutlined,
  DeleteOutlined,
  SearchOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { List, Card, Button, Checkbox, Popconfirm, Modal } from 'antd'
import { connect, DispatchProp } from 'react-redux'
import { RootState } from '../../store/state'
import { Clone, emptyClone, Gene } from '../../models/Clone'
import { GeneInput } from '../GeneInput'
import { GeneList } from '../GeneList'
import {
  addClone,
  selectClone,
  deselectClone,
  deleteClone,
  starClone,
  unstarClone,
  selectAllClones,
  deselectAllClones,
  setFilter,
} from '../../store/clones/actions'
import classNames from 'classnames'

const { confirm } = Modal

interface Props extends DispatchProp {
  inventory: Clone[]
  filter: Gene[]
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

const CloneListComponent: FC<Props> = ({ inventory, filter, dispatch }) => {
  const [addNewClone, setAddNewClone] = useState(emptyClone())
  const [activeTab, setActiveTab] = useState('all')

  const hasFilter = filter && filter.filter((c) => c !== '').length > 0
  let dataSource =
    activeTab === 'all' ? inventory : inventory.filter((c) => c.favorite)

  if (hasFilter) {
    dataSource = dataSource.filter((c) => {
      for (let i = 0; i < 5; i++) {
        if (filter[i] !== '' && filter[i] !== c.genes[i]) {
          return false
        }
      }

      return true
    })
  }

  return (
    <div className={styles.container}>
      <Card
        title="My clones"
        tabList={tabList}
        activeTabKey={activeTab}
        onTabChange={setActiveTab}
      >
        <div className={styles.info}>
          <p>
            This is your registered clones. Select clones (with checkbox) to get
            the crossbreed outcome.
          </p>
        </div>

        <div className={styles.addNewContainer}>
          <div className={styles.addon}>Add clone:</div>
          <div className={styles.input}>
            <GeneInput
              value={addNewClone}
              onChange={(v) => {
                const add = () => {
                  setAddNewClone(emptyClone())
                  dispatch(addClone(v))
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
        </div>

        <List size="small">
          <List.Item>
            <div className={classNames(styles.searchRow, styles.row)}>
              <div className={styles.column}>
                <Checkbox
                  onChange={(e) => {
                    if (e.target.checked) {
                      dispatch(selectAllClones())
                    } else {
                      dispatch(deselectAllClones())
                    }
                  }}
                  checked={
                    inventory.filter((c) => c.selected).length ===
                    inventory.length
                  }
                />
              </div>
              <div className={styles.column}>
                <div className={styles.searchIconContainer}>
                  <SearchOutlined style={{ fontSize: 20 }} />
                </div>
              </div>
              <div
                className={classNames(
                  styles.genePickerContainer,
                  styles.column
                )}
              >
                <GeneInput
                  singleMode
                  value={filter}
                  onChange={(v) => dispatch(setFilter(v))}
                />
              </div>
              <div className={styles.column}>
                {hasFilter && (
                  <Button
                    onClick={() => dispatch(setFilter(emptyClone()))}
                    icon={<CloseOutlined />}
                    shape="round"
                  >
                    Clear filter
                  </Button>
                )}
              </div>
            </div>
          </List.Item>
        </List>
        <List
          size="small"
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item>
              <div className={styles.row}>
                <div className={styles.column}>
                  <Checkbox
                    checked={item.selected}
                    onChange={(e) =>
                      e.target.checked
                        ? dispatch(selectClone(item.id))
                        : dispatch(deselectClone(item.id))
                    }
                  />
                </div>
                <div className={styles.column}>
                  <Button
                    type={item.favorite ? 'default' : 'dashed'}
                    onClick={() => {
                      if (item.favorite) {
                        dispatch(unstarClone(item.id))
                      } else {
                        dispatch(starClone(item.id))
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
                  onConfirm={() => dispatch(deleteClone(item.id))}
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
  filter: state.clones.filter,
})

export const CloneList = connect(mapStateToProps)(CloneListComponent)
