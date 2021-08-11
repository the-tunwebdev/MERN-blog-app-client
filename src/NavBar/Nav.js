import React, { useState,useEffect } from 'react'
import './Nav.css'
import * as Cookies from "js-cookie";
import {getUser} from '../redux/index'
import {connect} from 'react-redux'
function Nav(props) {
    useEffect(()=>{
        console.log(props.getUser())

    },[])
    const logout  =  async ()=>{
        
        try{
            const token =  Cookies.get("token")

            const response = await fetch("http://localhost:5000/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                    "Authorization": 'Bearer' + token
                }

            })
            const data =  await response.json()
            
            window.location = '/'
            
            Cookies.remove('session')
            Cookies.remove('token')
            Cookies.remove('id')

        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div>
            <input type="checkbox" id="check" style={{top : "0"}}/>
            <label for="check" >
                <i className="fas fa-bars" id="btn" style={{position: "fixed" }}></i>
                <i className="fas fa-times" id="cancel" style={{position: "fixed"}}></i>
            </label>
            <div className="sidebar" style={{top : "0"}}>
                <header>My App</header>
                <ul>
                <li><a href="/"><i className="fa fa-home"></i>Home</a></li>
                
                {
                   Cookies.get("session") ? 
                   
                   <div>
                       
                       <li><a href="/addblog"><i className="fa fa-th"></i>Add Blog</a></li>
                        <li><a href="/favblog"><i className="fa fa-thumbs-up"></i>Liked blogs</a></li>
                
                        
                        <li><a href="/me"><i className="fa fa-star"></i>My Blogs</a></li>
                        <li><a href="/me"><i className="fa fa-user"></i>{props.user}</a></li>
                        <li><a href="#" onClick={logout}><i className="fa fa-sign-out"></i>Logout</a></li>
                   </div>:
                   <div>
                    <li id='register'><a href="/register"><i className="fa fa-user-plus " ></i>Register</a></li>
                        <li id='login'><a href="/login"><i className="fas fa-sign-in-alt " ></i>Login</a></li>
                   </div>
                }
                </ul>
            </div>
            <section></section>
        
            
        </div>
    )
}
const mapStateToProps = state =>{
    return{
        user :  state.user
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        getUser :  ()=> dispatch(getUser())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Nav)