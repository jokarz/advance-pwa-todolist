import { combineReducers } from 'redux'
import Topic from './topicReducer.js'
import Misc from './miscReducer.js'
export default combineReducers({
  Misc, Topic
})
