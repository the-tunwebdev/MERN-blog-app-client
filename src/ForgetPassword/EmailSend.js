import React,{useState} from 'react'
import '../user/login/style.css'
function EmailSend() {
    const [email,Setemail] =  useState('')
    const checkForEmail =  async()=>{
        const body  = {email}
        const response = await fetch("http://localhost:5000/forget", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        if(data._id){
            document.getElementById('info').textContent =  'go check your inbox to reset your password'
            document.getElementById('info').style.color =  'green'

        }else{
            document.getElementById('info').textContent =  data.err
            document.getElementById('info').style.color =  'red'

        }
        
    }
    return (
        <div className='container center ' >
            <div className="w-full max-w-lg container " >
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                <p className="text-base md:text-lg flex justify-center text-blue-600 font-bold  " style={{marginBottom: "10px"}}>Add your email address here</p>
                <p className="text-base md:text-lg flex justify-center text-green-600   " id='info'>We will send you an email to change your password</p>



                <div className='up'>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        email
                        </label>
                        <input value={email} onChange={e => Setemail(e.target.value)}className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="username" type="email" placeholder="email" />
                    </div>
                    
                    <div className="flex items-center justify-center">
                        <button onClick={checkForEmail}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                       Send email
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

export default EmailSend
