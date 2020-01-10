import React from 'react'
import Main from '../../views/Main'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../../redux/reducers'

import { render, fireEvent } from '@testing-library/react'

test('Default setup renders', async () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )
  const { asFragment} = render(<Provider store={store}>
    <Main />
  </Provider>)
  expect(asFragment()).toMatchSnapshot();
})

test('Modal renders', async () => {
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  )
  const { container} = render(<Provider store={store}>
    <Main />
  </Provider>)
  fireEvent.click(container.querySelector('.fas.fa-plus'))
  expect(container.querySelector('.modal.d-block')).toBeTruthy()
})
