import React, { useState } from 'react'
import './Nav.css'
import * as Cookies from "js-cookie";

function Nav() {
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
            console.log(data)
            Cookies.remove('session')
            window.location = '/'

        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div>
            <input type="checkbox" id="check"/>
            <label for="check" >
                <i class="fas fa-bars" id="btn" style={{position: "fixed"}}></i>
                <i class="fas fa-times" id="cancel" style={{position: "fixed"}}></i>
            </label>
            <div class="sidebar">
                <header>My App</header>
                <ul>
                <li><a href="/"><i class="fa fa-home"></i>Home</a></li>
                
                {
                   Cookies.get("session") ? 
                   
                   <div>
                       
                       <li><a href="/addblog"><i class="fa fa-th"></i>Add Blog</a></li>
                        <li><a href="/favblog"><i class="fa fa-star"></i>Fav blogs</a></li>
                
                        
                        <li><a href="/me"><i class="fa fa-star"></i>My Blogs</a></li>
                        <li><a href="/me"><i class="fa fa-user"></i>{Cookies.get('session')}</a></li>
                        <li><a href="/logout" onClick={logout}><i class="fa fa-sign-out"></i>Logout</a></li>

                        
                        
                        
                   </div>:<div>
                   <li id='register'><a href="/register"><i class="fa fa-user-plus " ></i>Register</a></li>
                    <li id='login'><a href="/login"><i class="fas fa-sign-in-alt " ></i>Login</a></li>
                   </div>
                }
                
                {/* <li><a href="#"><i class="far fa-question-circle"></i>About</a></li>
                <li><a href="#"><i class="fas fa-sliders-h"></i>Services</a></li>
                <li><a href="#"><i class="far fa-envelope"></i>Contact</a></li> */}
                </ul>
            </div>
            <section></section>
        
            
        </div>
    )
}

export default Nav
