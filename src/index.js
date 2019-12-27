import React, { } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './redux/reducers'
import App from './App.js'
import './index.css'
import * as serviceWorker from './serviceWorker'

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware // lets us dispatch() functions
  )
)

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

if (document.getElementById('app')) {
  render(<Root />, document.getElementById('app'))
}

if (process.env.NODE_ENV === 'production') {
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
