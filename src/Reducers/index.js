import {combineReducers} from 'redux'
import loggedReducer from './User'
const allReducers = combineReducers({
    
    isLogged : loggedReducer
})
export default allReducers