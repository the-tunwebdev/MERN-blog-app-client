import React, { useEffect,useState } from 'react'
import * as Cookies from "js-cookie";
import Blog from './Blog'
function UserBlog() {
    const [posts,setposts] =  useState([])
    const [loader,setloader] = useState(false)
    
    const getMyBlogs = async() =>{
        try{
            const token =  Cookies.get("token")
            const response = await fetch(`http://localhost:5000/me`, {
                headers: {
                    "Content-Type": "application/json",
                    
                    "Authorization": 'Bearer' + token
                },
              
            });
            const data = await response.json()
            if(data.error){
                return document.getElementById('err').textContent =  'please authenticate'
            }else{
                setposts(data)

            }
            
            
            
            


        }catch(err){

        }
    }
    const removePost = async(id)=>{ 
        try {
            const token =  Cookies.get("token")
            const deletePost = await fetch(`http://localhost:5000/me/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    
                    "Authorization": 'Bearer' + token
                },
              method: "DELETE"
            });
            const data = await deletePost.json()
            
      
            setposts(posts.filter(post => post._id !== id));
          } catch (err) {
            console.error(err.message);
          }
    }
    useEffect(()=>{
        getMyBlogs()

    },[])
    return (
        <div className='flex justify-center flex-wrap space-x-6 content-start  ' >
            <p id= 'err'></p>
           
                
                    {
                        posts.length === 0 && document.getElementById('err') === null ? <h1>you didnt post nothing</h1>  : 
                        
                            posts.map((post)=>(
                                    <Blog title={post.title} description={post.description} imageURL={post.imageURL} removePost={() =>removePost(post._id)} _id={post._id} />
                            )) 
                        
                    }
                

            
            
                
                
            
        </div>
    )
}

export default UserBlog
