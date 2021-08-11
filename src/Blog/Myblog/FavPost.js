import React from 'react'
import * as Cookies from "js-cookie";
function Post({title,imageURL,description,owner,removeFav}) {

    const ViewUserPost = ()=>{
        window.location = `/blog/${owner}`
    }
    
    
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg  "style={{margin : "20px",zIndex : "20"}}>
            
                        
                {imageURL ==='' ? <div style={{height : "40%"}}></div> :<img className="w-full" src={imageURL}  style={{"height" : "40%"}} /> }
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2 text-center" style={{"height" : "20%"}}>{title}</div>
                    <p className="text-gray-700 text-base" style={{"height" : "45%"}}>
                                {description}
                                </p>
                </div>
                
                   
                    <div className="px-6 pt-4 pb-2  space-x-4">
                        <span className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 " onClick={ViewUserPost} style={{cursor : "pointer",height : "10%"}} >#by{owner}</span>
                        
                            
                        <i className="fa fa-trash" style={{cursor : "pointer",fontSize : "30px" }} onClick={removeFav} id='fav'></i>
                        

                        

                        

                                
                    </div>
                    
                
                
        </div>
        
    )
}

export default Post
