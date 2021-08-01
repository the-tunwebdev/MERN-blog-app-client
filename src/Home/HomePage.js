import React,{useContext, useEffect,useState} from 'react'
import Post from './post/post'
import './loader.css'
import * as Cookies from "js-cookie";
function HomePage() {
    console.log(Cookies.get('id'))
    const [posts,Setpost] =  useState([])
    const [loader,setloader] =  useState(false)
    console.log(posts)
    const getPosts = async ()=>{
        try {
            const response = await fetch("http://localhost:5000/");
            const data = await response.json();
            console.log(data)
            Setpost(data)
            setloader(true)
            
            console.log(posts)
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(()=>{
        getPosts()

    },[])
    
    
    return (
        <div className='flex justify-center flex-wrap space-x-6 content-start  ' >
           
            {loader ?
                posts.map((post)=>(
                    <Post title={post.title} description={post.description} imageURL={post.imageURL} owner={post.owner} _id={post._id}  />
                )) : 
                <div className='lds-roller'></div>
                
            }
           
            
            
            
            
        </div>
    )
}

export default HomePage
