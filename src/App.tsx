import React from 'react'
import { Layout } from './components/Layout'
import { Provider } from 'react-redux'
import { configureStore } from './store/configure'

const store = configureStore()

function App() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  )
}

App.store = store

export default App
