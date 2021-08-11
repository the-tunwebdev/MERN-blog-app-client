
import React from 'react'

import * as Cookies from "js-cookie";

const loggedReducer  =  (state='' , action) =>{
        switch(action.type){
            case 'SIGN_IN' : 
            return state + Cookies.get("session")
            default  :
                return state
        }
}
    
export default loggedReducer

