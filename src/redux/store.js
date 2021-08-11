import {createStore} from 'redux'
import userReducer from './user/UseReducer'

const store =  createStore(userReducer)
export default store