const initialState = {
  loading: false,
  alert: false,
  alertAt: 'topic', // todo+id, topic, edit+id, login
  alertMessage: '...',
  success: false,
  successAt: 'nth',
  viewArchive: false
}

const miscReducer = (state = initialState, action) => {
  const { data } = action
  switch (action.type) {
    case 'resetSuccess':
      return { ...state, successAt: 'nth', success: false }
    case 'success':
      return { ...state, success: true }
    case 'successAt':
      return { ...state, successAt: data }
    case 'loadStart':
      return { ...state, loading: true }
    case 'loadStop':
      return { ...state, loading: false }
    case 'alertAt':
      return { ...state, alertAt: data }
    case 'alertStart':
      return { ...state, alert: true }
    case 'alertStop':
      return { ...state, alert: false }
    case 'updateAlertMsg':
      return { ...state, alertMessage: data }
    case 'setArchive':
      return { ...state, viewArchive: data }
    default:
      return state
  }
}

export default miscReducer
