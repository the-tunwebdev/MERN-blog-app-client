import { GET_USER } from "./UserTypes"
import * as Cookies from "js-cookie";
const initialState =  {
    user  : null
}
const userReducer  =  (state=initialState , action )=>{
    switch(action.type){
        case GET_USER : 
        return{
            ...state , 
            user :  Cookies.get('session')

        }
        default :  return state
    }
}
export default userReducer