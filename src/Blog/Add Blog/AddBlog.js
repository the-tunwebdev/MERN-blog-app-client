import React,{useState} from 'react'
import * as Cookies from "js-cookie";

function AddBlog() {
    const [title,Settitle] =  useState('')
    const [imageURL , SetImageUrl] =  useState('')
    const [description, SetDescription] = useState('')
    const addBlog = async (e)=>{
        
        e.preventDefault()
        
        try{
            
            const token =  Cookies.get("token")
           
            if(title === '' || description === ''){
                document.getElementById('alert').style.color = 'red'
                document.getElementById('alert').textContent =  'add title and description'
            }else{
                const body  =  {title,imageURL,description}
                const response = await fetch("http://localhost:5000/addblog", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        
                        "Authorization": 'Bearer' + token
                    },
                    body: JSON.stringify(body)
                })
                const data =  await response.json()
                Settitle('')
                SetImageUrl('')
                SetDescription('')
                
                if(data._id){
                    document.getElementById('alert').style.color = 'green'
                    document.getElementById('alert').textContent =  "your post have been added"
                    window.location = '/'


                }else{
                    document.getElementById('alert').style.color = 'red'
                    document.getElementById('alert').textContent =  data.error

                }

            }
            

        }catch(err){
            console.log(err.message)

        }
    }
    return (
        <div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <p className="text-base md:text-lg flex justify-center text-blue-600 font-bold ">Add your own blog</p>
                        <p className="text-base md:text-lg flex justify-center text-blue-600 font-bold " id='alert'></p>

                    <form>
                    <div className="mb-2">
                        
                        <label className="text-xl text-gray-600">Title <span className="text-red-500">*</span></label><br />
                        <input value={title}  onChange={e => Settitle(e.target.value)} type="text" className="border-2 border-gray-300 p-2 w-full" name="tigtle" id="title" placeholder="add title"  required />
                        </div>
                        <div className="mb-4">
                        <label className="text-xl text-gray-600">ImageUrl <span className="text-red-500">*</span></label><br />
                        <input value={imageURL}  onChange={e => SetImageUrl(e.target.value)} type="text" className="border-2 border-gray-300 p-2 w-full" name="imageUrl" placeholder="(Optional)" id="title"  required />
                        </div>
                        <div className="mb-4">
                        <label className="text-xl text-gray-600">Description</label><br />
                        <input  value={description}  onChange={e => SetDescription(e.target.value)} type="text" className="border-2 border-gray-300 p-2 w-full" name="description" id="description" placeholder="add post description" />
                        </div>
                        
                        <div className="flex p-1">
                        <button role="submit" className="p-3 bg-blue-500 text-white hover:bg-blue-400" style={{marginLeft : "auto"}} onClick={addBlog}>Submit</button>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default AddBlog
