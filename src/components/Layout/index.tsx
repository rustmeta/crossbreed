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
import { Footer } from '../Footer'

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
      <header className={styles.header}>
        <Header />
      </header>
      <div className={styles.tabs}>
        <Pages />
      </div>
      <div className={styles.right}>
        <CloneList />
      </div>
      <div className={styles.left}>
        <Crossbreed />
      </div>
      <div className={styles.leftBottom}>
        <Suggestions />
      </div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  intro: state.pages.pages.length === 1 && !state.pages.pages[0].title,
  introId: state.pages.pages[0].id,
})

export const Layout = connect(mapStateToProps)(LayoutComponent)
