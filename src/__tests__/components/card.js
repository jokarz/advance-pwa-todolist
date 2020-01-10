import React from 'react'
import Card from '../../components/card/Card'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../../redux/reducers/'
import { render, fireEvent, wait, waitForElement } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const defaultStoreData = () => ({
  Misc: {
    loading: false,
    alert: false,
    alertAt: 'topic',
    alertMessage: '...',
    success: false,
    successAt: 'nth',
    viewArchive: false
  },
  Topic: [{
    id: 'pscz1ggc9gb',
    title: 'Test',
    archive: false,
    todos: {
      completed: [],
      incomplete: []
    }
  }]
})




test('Card renders', async () => {
  const item = { ...defaultStoreData().Topic[0] }
  const store = createStore(
    defaultStoreData,
    applyMiddleware(
      thunkMiddleware
    )
  )
  const { asFragment } = render(<Provider store={store}>
    <Card entrance={1}
      id={item.id}
      key={item.id}
      completed={item.todos.completed || []}
      incomplete={item.todos.incomplete || []}
      title={item.title}
      setHideFab={false} />
  </Provider>)
  expect(asFragment()).toMatchSnapshot();
})

test('Card with 1 todo renders', async () => {
  const storeData = () => {
    const temp = JSON.parse(JSON.stringify(defaultStoreData()))
    temp.Topic[0].todos.incomplete.push({
      id: 'ba9k67d0l7',
      content: 'Testing'
    })
    return temp
  }
  const item = { ...storeData().Topic[0] }
  const store = createStore(
    storeData,
    applyMiddleware(
      thunkMiddleware
    )
  )
  const { container, getByPlaceholderText } = render(<Provider store={store}>
    <Card entrance={1}
      id={item.id}
      key={item.id}
      completed={item.todos.completed || []}
      incomplete={item.todos.incomplete || []}
      title={item.title}
      setHideFab={false} />
  </Provider>)
  //userEvent.type(getByPlaceholderText('Add another todo...'), 'testing')
  expect(container.querySelectorAll('.card .card-body.px-0.pb-0 .form-group').length).toEqual(1)
  expect(getByPlaceholderText('Add another todo...')).toBeTruthy()
})