import React,{useEffect, useState} from 'react'
import '../user/login/style.css'
function EmailSend() {
    const [password,setpassword] =  useState('')
    const [repeatpassword,setrepeatpassword] =  useState('')
    const [error,seterror] =  useState('')
    const id = window.location.pathname.split('/')[2]
    const checkId =  async ()=>{
        
        const response = await fetch(`http://localhost:5000/resetpass/${id}`, {
            
        })
        const data =  await response.json()
        if(data.err){
            seterror(data.err)
        }else{
            console.log(data)
        }
    }
    const updatePass  = async()=>{
        if(password !== repeatpassword){
            document.getElementById('info').textContent = 'password dont match'
            document.getElementById('info').style.color  =  'red'
        }else{
            const body = {password,repeatpassword}
            const response = await fetch(`http://localhost:5000/resetpass/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
            })
            const data = await response.json()
            window.location = '/login'

        }
        
        

    }
    useEffect(()=>{
        checkId()
    },[])

    
    return (
        <div class='container center' >
            
            <div className="w-full max-w-lg container " >
                {error.length > 0 ? <h1 style={{color: 'red',textAlign: 'center'}}>wrong id</h1> :
                
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                        <p class="text-base md:text-lg flex justify-center text-blue-600 font-bold  " style={{marginBottom: "10px"}}>Enter new password</p>
                        <p class="text-base md:text-lg flex justify-center text-green-600   " id='info'></p>



                        <div class='up'>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                New password
                                </label>
                                <input value={password} onChange={e => setpassword(e.target.value)}className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" type="password" placeholder="new password" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Repeat Password
                                </label>
                                <input value={repeatpassword} onChange={e => setrepeatpassword(e.target.value)}className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" type="password" placeholder="confirm password" />
                            </div>
                            
                            <div className="flex items-center justify-center">
                                <button onClick={updatePass}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Update
                                </button>
                                
                            </div>
                        </div>
                    </form>
                    
                
                }
                
            </div>
            
        </div>
    )
}

export default EmailSend
