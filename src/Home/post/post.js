import React,{useState,useEffect} from 'react'
import * as Cookies from "js-cookie";

function Post({title,imageURL,description,owner,isstrange,likes,_id,likebtn,unlikebtn}) {
    const [like,setlike] =  useState(false)
    const [text,settext] =  useState('')
    const [commentpost,setcommentpost] = useState([])
    
    
    const token =  Cookies.get("token")
    const ViewUserPost = ()=>{
        window.location = `/blog/${owner}`
    }
    const ViewMyPost = ()=>{
        window.location =  '/me'
    }
    const getPosts = async ()=>{
        try {
            const response = await fetch("http://localhost:5000/");
            const data = await response.json();
            data.map((sigdata)=>{
                setcommentpost(sigdata.comments)
            })
            

        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(()=>{
        getPosts()


    },[])
    const id =  Cookies.get("id")
    const makeComment = async (text,id)=>{
        try{
            const response   = await fetch('http://localhost:5000/comment',{
                method:"PUT",
                headers: {
                    "Content-Type": "application/json",
                    
                    "Authorization": 'Bearer' + token
                },
                body:JSON.stringify({
                    text,
                    id
                    
            })
        })
        const data = await response.json()
        


        setcommentpost(data.comments)

        }catch(err){
            console.log(err)
        }
    }
    
    
    
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg  "style={{margin : "20px",zIndex : "20"}}>
            {imageURL ==='' ? <div style={{height : "40%"}}></div> :<img className="w-full" src={imageURL}  style={{"height" : "40%"}} /> }
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-center" style={{"height" : "20%"}}>{title}</div>
                    <p className="text-gray-700 text-base" style={{"height" : "90%"}}>
                        {description}
                    </p>
                </div>
                
                   
                    <div>
                        {
                            Cookies.get('id')=== owner ? 
                            <div className="px-6 pt-4 pb-2  space-x-4 flex justify-end mt-4"> <span className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 " onClick={ViewMyPost} style={{cursor : "pointer",height : "10%",marginRight : "auto"}} >#byme</span></div> :
                            <div>
                            <div className="px-6 pt-4 pb-2  space-x-4 flex justify-end mt-4">
                                <span className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 " onClick={ViewUserPost} style={{cursor : "pointer",height : "10%"}} >#by{owner}</span>
                                {isstrange || like ? null : 
                                <div style={{display : "flex",justifyContent : "space-between"}}>
                                    {likes.includes(id) ? <i className="fa fa-thumbs-down" style={{cursor : "pointer",fontSize : "30px" }} onClick={unlikebtn} id='fav'></i>  : <i className="fa fa-thumbs-up" style={{cursor : "pointer",fontSize : "30px" }} onClick={likebtn} id='fav'></i>}
                                    <h2 style={{marginLeft : "10px"  ,fontSize : "30px" }}>{likes.length}</h2>
                                
                                </div>  }
                                
                                
                            </div>
                            {
                                commentpost.map((comment)=>(
                                    <div className="" style={{display : "flex"}}>
                                        <h3 style={{marginLeft:"15px", marginRight : "30px" }}>{comment.postedBy} : </h3>
                                        <p>{comment.text}</p>
                                    </div>
                                   
                                ))
                            }
                            
                            
                            <form className="w-full max-w-sm">
                                <div className="flex items-center border-b border-teal-500 py-2">
                                <input value={text} onChange={e => settext(e.target.value)} className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type="text" placeholder="send comment" />
                                
                                <button onClick={(e)=>{
                                    e.preventDefault()
                                    makeComment(text,_id)}} className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                                    send
                                </button>
                                </div>
                            </form>

                            </div>
                        }
                        
                        
                            
                        
                        

                        

                        

                                
                    </div>
                    
                
                
        </div>
        
    )
}

export default Post
