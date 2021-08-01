import React,{useEffect} from 'react'

function Confirmation() {
    const path  = window.location.pathname.split('/')
    const fetchdata =  async ()=>{
        const response = await fetch(`http://localhost:5000/confirmation/${path[2]}`, {
        })
        const data = await response.json()
        console.log(data)
        window.location = '/login'
    }
    
    useEffect(() =>{ 
        fetchdata()
        
    },[])
    
    return (
        <div>
            
            

            
        </div>
    )
}

export default Confirmation
