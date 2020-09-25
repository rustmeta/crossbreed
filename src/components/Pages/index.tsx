import React, { FC, useState } from 'react'
import { connect, DispatchProp } from 'react-redux'
import styles from './Pages.module.scss'
import { RootState } from '../../store/state'
import { Input, Modal, Tabs } from 'antd'
import { Page, PageIcon, pageIcons } from '../../models/Page'
import { addPage, changePage, deletePage } from '../../store/pages/actions'
import { IconPicker } from '../PageForm/IconPicker'

const { TabPane } = Tabs
const { confirm } = Modal

interface Props extends DispatchProp {
  pages: Page[]
  activePage: string
}

const PagesComponent: FC<Props> = ({ pages, activePage, dispatch }) => {
  const [createModalVisible, setCreateModalVisible] = useState(false)

  const [title, setTitle] = useState('')
  const [icon, setIcon] = useState('')

  return (
    <>
      <Tabs
        type="editable-card"
        activeKey={activePage}
        className={styles.tabs}
        onChange={(key) => dispatch(changePage(key))}
        onEdit={(key, action) => {
          switch (action) {
            case 'remove':
              typeof key === 'string' &&
                confirm({
                  type: 'error',
                  title:
                    'Are you sure, this cannot be undone. all clones on this page will be deleted too.',
                  okText: 'Delete page and its clones',
                  okType: 'danger',
                  onOk: () => {
                    dispatch(deletePage(key))
                    setCreateModalVisible(false)
                  },
                })
              return
            case 'add':
              setCreateModalVisible(true)
              return
          }
        }}
      >
        {pages.map((page) => (
          <TabPane
            tab={
              <div className={styles.tab}>
                {page.icon && <img alt="icon" src={pageIcons[page.icon]} />}
                <span>{page.title ? page.title : 'Unnamed page'}</span>
              </div>
            }
            key={page.id}
            closable
          />
        ))}
      </Tabs>
      <Modal
        onCancel={() => setCreateModalVisible(false)}
        onOk={() => {
          dispatch(addPage(title, icon as PageIcon))
          setCreateModalVisible(false)
        }}
        visible={createModalVisible}
        title="Create a new page"
      >
        <Input
          placeholder="Unnamed page"
          size="large"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%' }}
        />
        <IconPicker onChange={(k) => setIcon(k)} value={icon} />
      </Modal>
    </>
  )
}

const mapStateToProps = (state: RootState) => ({
  pages: state.pages.pages,
  activePage: state.pages.activePage,
})

export const Pages = connect(mapStateToProps)(PagesComponent)
