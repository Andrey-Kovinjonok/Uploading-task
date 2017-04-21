import { combineReducers } from 'redux'
import files from './files'

const appReducers = combineReducers({
  files,
})

export default appReducers