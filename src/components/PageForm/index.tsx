import { Card } from 'antd'
import React, { FC } from 'react'
import { connect, DispatchProp } from 'react-redux'
import { Page, PageIcon } from '../../models/Page'
import { editPage } from '../../store/pages/actions'
import { RootState } from '../../store/state'
import { IconPicker } from './IconPicker'
import styles from './PageForm.module.scss'

interface Props {
  id: string
}

interface StateProps extends DispatchProp {
  page: Page
}

const PageFormComponent: FC<Props & StateProps> = ({ page, dispatch }) => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Card title={'What are you growing?'}>
          <p>
            This can be changed later. And you can add more types/pages later.
          </p>
          <IconPicker
            value={''}
            onChange={(icon) => {
              dispatch(
                editPage(page.id, {
                  icon: icon as PageIcon,
                  title: 'Unnamed page',
                })
              )
            }}
          />
        </Card>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState, props: Props) => ({
  page: state.pages.pages.find(({ id }) => id === props.id) as Page,
})

export const PageForm = connect(mapStateToProps)(PageFormComponent)
