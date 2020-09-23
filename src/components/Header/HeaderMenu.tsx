import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, message, Input, Modal } from 'antd'
import React, { FC, useState } from 'react'
import { LOCALSTORAGE_KEY } from '../../constants/storage'
import { copyToClipboard } from '../../lib/copy'
import { store } from '../../store'

const { confirm } = Modal

const { TextArea } = Input

interface Props {}

export const HeaderMenu: FC<Props> = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [dataInput, setDataInput] = useState('')

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          try {
            copyToClipboard(btoa(JSON.stringify(store.getState())))
            message.success('Data copied to clipboard')
          } catch {}
        }}
        key="0"
      >
        Export data (copy)
      </Menu.Item>
      <Menu.Item onClick={() => setModalVisible(true)}>
        Import data (paste)
      </Menu.Item>
      <Menu.Item
        onClick={() =>
          confirm({
            title: 'This will delete all data and cannot be undone.',
            okText: 'WIPE!!',
            okType: 'danger',
            onOk: () => {
              localStorage.removeItem(LOCALSTORAGE_KEY)
              window.location.reload()
            },
          })
        }
      >
        Wipe Data
      </Menu.Item>
    </Menu>
  )

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button icon={<EllipsisOutlined />} shape={'circle'} />
      </Dropdown>
      <Modal
        title="Import data"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => importData(dataInput)}
      >
        <div>
          <p>Paste the data here (base64 format)</p>
          <div>
            <TextArea
              value={dataInput}
              rows={3}
              onChange={(e) => setDataInput(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

function importData(data: string) {
  try {
    const json = atob(data)
    // parse to check for format errors
    JSON.parse(json)

    localStorage.setItem(LOCALSTORAGE_KEY, json)
    message.success('Data imported, reloading...')
    setTimeout(() => window.location.reload(), 1000)
  } catch (error) {
    message.error('Data is invalid')
  }
}
