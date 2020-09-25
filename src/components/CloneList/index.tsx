import React, { FC, useState } from 'react'
import { yellow } from '@ant-design/colors'
import styles from './CloneList.module.scss'
import {
  StarFilled,
  StarOutlined,
  DeleteOutlined,
  SearchOutlined,
  CloseOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { List, Button, Checkbox, Popconfirm, Modal, Tabs } from 'antd'
import { connect } from 'react-redux'
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
  // selectAllClones,
  // deselectAllClones,
  setFilter,
} from '../../store/clones/actions'
import classNames from 'classnames'
import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { FlexCard } from '../FlexCard'

const { confirm } = Modal

interface Props {
  inventory: Clone[]
  filter: Gene[]
}

interface Dispatch {
  dispatch: ThunkDispatch<RootState, unknown, Action>
}

const CloneListComponent: FC<Props & Dispatch> = ({
  inventory,
  filter,
  dispatch,
}) => {
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
    <FlexCard
      title="My clones"
      tabs={
        <Tabs activeKey={activeTab} onChange={(k) => setActiveTab(k)}>
          <Tabs.TabPane tab={`all (${inventory.length})`} key={'all'} />
          <Tabs.TabPane
            tab={`favorites (${inventory.filter((c) => c.favorite).length})`}
            key={'fav'}
          />
        </Tabs>
      }
      extras={
        <div>
          <div className={styles.inputContainer}>
            <div className={styles.addon}>
              <span style={{ marginRight: 10 }}>Add clone</span>
              <PlusOutlined />
            </div>
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
          <div className={styles.inputContainer}>
            <div className={styles.addon}>
              <span style={{ marginRight: 10 }}>Filter</span>
              <SearchOutlined />
            </div>
            <div className={styles.input}>
              <div className={classNames(styles.column)}>
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
                    style={{ marginLeft: 10 }}
                  >
                    Clear filter
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <List
        size="small"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item>
            <div className={styles.row}>
              <div className={styles.column}>
                <Button
                  shape="round"
                  onClick={() => {
                    if (item.selected) {
                      dispatch(deselectClone(item.id))
                    } else {
                      dispatch(selectClone(item.id))
                    }
                  }}
                  icon={
                    <Checkbox
                      style={{ marginRight: 10 }}
                      checked={item.selected}
                      onChange={(e) =>
                        e.target.checked
                          ? dispatch(selectClone(item.id))
                          : dispatch(deselectClone(item.id))
                      }
                    />
                  }
                  type="primary"
                  ghost
                >
                  Plant
                </Button>
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
    </FlexCard>
  )
}

const mapStateToProps = (state: RootState) => ({
  inventory: state.clones.pages[state.pages.activePage].inventory,
  filter: state.clones.pages[state.pages.activePage].filter,
})

export const CloneList = connect(mapStateToProps)(CloneListComponent)
