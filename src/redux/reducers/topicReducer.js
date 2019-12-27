const initialState = null

const topicReducer = (state = initialState, action) => {
  const { data } = action
  switch (action.type) {
    case 'loadAll':
      return data
    default:
      return state
  }
}

export default topicReducer
