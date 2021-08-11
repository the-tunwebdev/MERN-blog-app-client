import React,{useEffect, useState} from 'react'
import * as Cookies from "js-cookie";
function EditBlog() {
    const [title,Settitle] =  useState('')
    const [imageURL , SetImageUrl] =  useState('')
    const [description, SetDescription] = useState('')
    const path  = window.location.pathname.split('/')
    const id = path[2]
    const token =  Cookies.get("token")
    
    const getValues= async() =>{
        try {
            
            const response = await fetch(`http://localhost:5000/edit/${id}`, {
                
                headers: {
                    "Content-Type": "application/json",
                    
                    "Authorization": 'Bearer' + token
                }
                
            })
            const data = await response.json();
            Settitle(data.title)
            SetImageUrl(data.imageURL)
            SetDescription(data.description)
            
            
        } catch (err) {
            console.error(err.message);
        }
    }
    const SaveChanges =  async () => {
        try{
            const body = {title,imageURL,description}
            const response = await fetch(`http://localhost:5000/edit/${id}`, {
                method :"PATCH" , 
                headers: {
                    "Content-Type": "application/json",
                    
                    "Authorization": 'Bearer' + token
                },
                body: JSON.stringify(body)

                
            })
            const data = await response.json();
            window.location = '/'

        }catch(err){
            console.log(err.message)
        }
    }
    useEffect(()=>{
        getValues()
    },[])
    return (
        <div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <p className="text-base md:text-lg flex justify-center text-blue-600 font-bold ">Edit your blog</p>
                        

                    <form>
                    <div className="mb-2">
                        
                        <label className="text-xl text-gray-600">Title <span className="text-red-500">*</span></label><br />
                        <input value={title}  onChange={e => Settitle(e.target.value)} type="text" className="border-2 border-gray-300 p-2 w-full" name="tigtle" id="titgle"  required />
                        </div>
                        <div className="mb-4">
                        <label className="text-xl text-gray-600">ImageUrl <span className="text-red-500">*</span></label><br />
                        <input value={imageURL}  onChange={e => SetImageUrl(e.target.value)} type="text" className="border-2 border-gray-300 p-2 w-full" name="imageUrl" id="title"  required />
                        </div>
                        <div className="mb-4">
                        <label className="text-xl text-gray-600">Description</label><br />
                        <input  value={description}  onChange={e => SetDescription(e.target.value)} type="text" className="border-2 border-gray-300 p-2 w-full" name="description" id="description" placeholder="(Optional)" />
                        </div>
                        
                        <div className="flex p-1">
                        <button role="submit" className="p-3 bg-green-500 text-white hover:bg-blue-400" style={{marginLeft : "auto"}} onClick={SaveChanges} >Change</button>

                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    )
}

export default EditBlog
