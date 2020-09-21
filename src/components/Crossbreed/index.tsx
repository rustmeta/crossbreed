import React, { FC } from 'react'
import styles from './Crossbreed.module.scss'
import { List } from 'antd'
import { connect } from 'react-redux'
import { RootState } from '../../store/state'
import { Clone } from '../../models/Clone'

interface Props {
  inventory: Clone[]
}

const CrossbreedComponent: FC<Props> = ({ inventory }) => {
  return (
    <div className={styles.container}>
      <List
        header={<div>Crossbreed</div>}
        bordered
        dataSource={inventory}
        renderItem={(item) => <List.Item>{item.id}</List.Item>}
      />
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  inventory: state.clones.inventory.filter((c) => c.selected),
})

export const Crossbreed = connect(mapStateToProps)(CrossbreedComponent)
