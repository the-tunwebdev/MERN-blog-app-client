import React,{useContext, useEffect,useState} from 'react'
import Post from './post/post'
import './loader.css'
import * as Cookies from "js-cookie";
function HomePage() {
//    --------Use State---------------------
    const token =  Cookies.get("token")
    const [posts,Setpost] =  useState([])
    const [loader,setloader] =  useState(false)
    const [commentpost,setcommentpost] = useState([])
    // const [text,settext] =  useState('')
//----------------------------------------------
    const getPosts = async ()=>{
        try {
            const response = await fetch("http://localhost:5000/");
            const data = await response.json();
            
            Setpost(data)
            data.map((sigdata)=>{
                setcommentpost(sigdata.comments)
            })
            setloader(true)

        } catch (err) {
            console.error(err.message);
        }
    }
    const addcomment = async (text,id)=>{
        try{
            await fetch('http://localhost:5000/comment',{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                    
                    "Authorization": 'Bearer' + token
                },
                body:JSON.stringify({
                    text,
                    id
                    
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = posts.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            Setpost(newData)
        
            
          
        })
        

        }catch(err){
            console.log(err)
        }
    }
    const AddToFav = async(title,imageURL,description,id) =>{
        try{
            
            
            const body =  {title,imageURL,description,id}
            
            const response = await fetch("http://localhost:5000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                    "Authorization": 'Bearer' + token
                },
                body: JSON.stringify(body)
            })
            const data = await response.json()
            if(data.error){
                window.location = '/login'           
            }

        }catch(err){
            console.log(err.message)

        }
    }
    const likebtn = (id)=>{
        const body ={id}
        fetch("http://localhost:5000/like",{
            method:"put",
            headers: {
                "Content-Type": "application/json",
                
                "Authorization": 'Bearer' + token
            },
            body: JSON.stringify(body)
        }).then(res=>res.json())
        .then(result=>{
                    
                   
                   AddToFav(result.title,result.imageURL,result.description,result._id)

          const newData = posts.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
                  
              }
          })
          Setpost(newData)
        }).catch(err=>{
            console.log(err)
            
        })
  }
  const removeFav = async(id)=>{
    try {
        const deletePost = await fetch(`http://localhost:5000/favblog/${id}`, {
            headers: {
                
                "Content-Type": "application/json",
                
                "Authorization": 'Bearer' + token
            },
          method: "DELETE"
        });
        console.log(deletePost)
        
    } catch (err) {
        console.error(err.message);
      }

}

  const unlikebtn = (id)=>{
    const body ={id}
    console.log(id)
    fetch("http://localhost:5000/unlike",{
        method:"put",
        headers: {
            "Content-Type": "application/json",
            
            "Authorization": 'Bearer' + token
        },
        body: JSON.stringify(body)
    }).then(res=>res.json())
    .then(result=>{
        console.log(id)
        removeFav(id)
        
        
        
      
      const newData = posts.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
      })
      Setpost(newData)
    }).catch(err=>{
      console.log(err)
  })
}
    useEffect(()=>{
        getPosts()

    },[])
    
    
    return (
        <div className='flex justify-center flex-wrap space-x-6 content-start  ' >
           
            {loader ?
                posts.map((post)=>(
                    <Post  comments={post.comments} addcomment={(e)=>{
                        e.preventDefault()
                        addcomment(e.target[0].value,post._id)
                        e.target[0].value=''}}  title={post.title} description={post.description} imageURL={post.imageURL} owner={post.owner} _id={post._id} likes={post.likes} likebtn={()=>likebtn(post._id)} unlikebtn={()=>unlikebtn(post._id)}  />
                    
                )) : 
                <div className='lds-roller'></div>
                
            }
           
            
            
            
            
        </div>
    )
}

export default HomePage
