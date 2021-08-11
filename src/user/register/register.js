import React, { useState } from 'react'
import './style.css'
function Register() {
    // use State
    const [name,Setname] =  useState('')
    const [email,Setemail] =  useState('')
    const [password,Setpassword] =  useState('')
    // submit function
    const Addnewregister = async(e)=>{
        e.preventDefault();
        try{
            
            const body  =  {name,email,password}
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            
            const data = await response.json()
            const fn =  await data
            
            
            if(fn.user){
                document.getElementById('checkemail').style.color = 'green'

                document.getElementById('checkemail').textContent = 'go check your inbox to verify your email'

            }else if(fn.errors){
                document.getElementById('checkemail').style.color = 'red'
                document.getElementById('checkemail').textContent =  fn.message

            }else{
                document.getElementById('checkemail').style.color = 'red'
                document.getElementById('checkemail').textContent =  'use another email (this email is registered)'

            }

        }catch(err){
            console.log(err.errors)
            

        }
    }
    return (
        <div className='container center '>
            
            <div className="w-full max-w-lg container ">
                
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mycontainer">
                    <p className="text-base md:text-lg flex justify-center text-blue-600 font-bold ">Register here to create your account </p>
                    <p className="text-base md:text-lg flex justify-center text-green-600 font-bold " id='checkemail'> </p>

                <div className='up'>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        name
                        </label>
                        <input value={name} onChange={e => Setname(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="username" type="text" placeholder="name" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        email
                        </label>
                        <input value={email} onChange={e => Setemail(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="username" type="email" placeholder="email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                        </label>
                        <input value={password} onChange={e => Setpassword(e.target.value)} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" type="password" placeholder="******************" />
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex justify-center ">
                        <button  onClick = {Addnewregister} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                        </button>
                       
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

export default Register
