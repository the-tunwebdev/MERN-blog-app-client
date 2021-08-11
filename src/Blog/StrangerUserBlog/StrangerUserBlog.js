import React,{useEffect,useState} from 'react'
import * as Cookies from "js-cookie";
import '../../Home/loader.css'
import Post from '../../Home/post/post'
function StrangerUserBlog() {
    const [posts,Setpost] =  useState([])
    const path  = window.location.pathname.split('/')
    const id = path[2]
    
        const [isstrange,setstrange] =  useState(true)
    
    const getStrangeUserPost= async() =>{
        try {
            
            const token =  Cookies.get("token")
            
            const response = await fetch(`http://localhost:5000/blog/${id}`, {
                
                headers: {
                    "Content-Type": "application/json",
                    
                    "Authorization": 'Bearer' + token
                }
                
            })
            const data = await response.json();
            
            
            
            Setpost(data)
        } catch (err) {
            console.error(err.message);
        }
    }
    
    useEffect(()=>{
        getStrangeUserPost()

    },[])
    return (
        <div className='flex justify-center flex-wrap space-x-6 content-start  ' >
           {posts.length !== 0 ?
               posts.map((post)=>(
                    <Post title={post.title} description={post.description} imageURL={post.imageURL} owner={post.owner} isstrange={isstrange} />
               )) : <p>any post</p>
           }
            
        </div>
    )
}

export default StrangerUserBlog
