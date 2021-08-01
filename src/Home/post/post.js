import React,{useState} from 'react'
import * as Cookies from "js-cookie";
import ReadMoreReact from 'read-more-react';
function Post({title,imageURL,description,owner,removeFav}) {
    
    const token =  Cookies.get("token")
    const ViewUserPost = ()=>{
        window.location = `/blog/${owner}`
    }
    const ViewMyPost = ()=>{
        window.location =  '/me'
    }
    const AddToFav = async() =>{
        try{
            const id =  Cookies.get("id")
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
            const fav  = document.getElementById('fav')
            fav.remove();
            const btn  = document.getElementById('ptag')
            btn.hidden =  false
            

        }catch(err){

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
                            <div className="px-6 pt-4 pb-2  space-x-4 flex justify-end mt-4">
                                <span className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 " onClick={ViewUserPost} style={{cursor : "pointer",height : "10%"}} >#by{owner}</span>
                                <i class="fa fa-thumbs-up" style={{cursor : "pointer",fontSize : "30px" }} onClick={AddToFav} id='fav'></i>
                                <i class="fa fa-arrow-right" href='/favblog' id='ptag' hidden style={{cursor : "pointer",fontSize : "30px" }} onClick={()=>window.location = '/favblog'}></i>
                            </div>
                        }
                        
                        
                            
                        
                        

                        

                        

                                
                    </div>
                    
                
                
        </div>
        
    )
}

export default Post
