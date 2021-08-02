import React, { useState,createContext } from 'react'

import * as Cookies from "js-cookie";
import './style.css'

function Login() {
    
    const [email,Setemail] =  useState('')
    const [password,Setpassword] = useState('')
    
   

    const LoginUser = async (e)=>{
        e.preventDefault();
        try{
            const body  =  {email,password}
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const data = await response.json()
            console.log(data.user)
            if(data.user){
                document.getElementById('alert').style.color = 'green'
                document.getElementById('alert').textContent =  `welcome ${data.user.name}`
                
                Cookies.set("session", data.user.name, { expires: 14 });
                Cookies.set("token", data.token, { expires: 14 });
                Cookies.set("id", data.user._id, { expires: 14 });
                window.location = '/'


                

                
               


            }else{
                document.getElementById('alert').style.color = 'red'
                document.getElementById('alert').textContent =  data.error
                
            }

        }catch(e){
            console.log(e)
        }
    }


    

    return (
        
        <div class='container center '>
            <div className="w-full max-w-lg container ">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mycontainer">
                <p class="text-base md:text-lg flex justify-center text-blue-600 font-bold ">Login here to add your own blog</p>
                <p class="text-base md:text-lg flex justify-center text-blue-600 font-bold " id='alert'></p>


                <div class='up'>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        email
                        </label>
                        <input value={email} onChange={e => Setemail(e.target.value)}className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="username" type="email" placeholder="email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                        </label>
                        <input value={password} onChange={e => Setpassword(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" type="password" placeholder="******************" />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={LoginUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/forget">
                        Forgot Password?
                        </a>
                    </div>
                </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                ©blog app
                </p>
      </div>
            
        </div>
        
    )
}

export default Login
