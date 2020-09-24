import React, { FC } from 'react'
import styles from './Layout.module.scss'
import { Crossbreed } from '../Crossbreed'
import { CloneList } from '../CloneList'
import { Header } from '../Header'
import { Pages } from '../Pages'
import { connect } from 'react-redux'
import { RootState } from '../../store/state'
import { PageForm } from '../PageForm'
import { Suggestions } from '../Suggestions'

interface Props {
  intro: boolean
  introId: string
}

const LayoutComponent: FC<Props> = ({ intro, introId }) => {
  if (intro) {
    return <PageForm id={introId} />
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.pages}>
        <div className={styles.tabs}>
          <Pages />
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <Crossbreed />
            <div style={{ height: 20 }} />
            <Suggestions />
          </div>
          <div className={styles.right}>
            <CloneList />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  intro: state.pages.pages.length === 1 && !state.pages.pages[0].title,
  introId: state.pages.pages[0].id,
})

export const Layout = connect(mapStateToProps)(LayoutComponent)
