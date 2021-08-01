import React,{useState,createContext} from 'react'
export const MovieContext =  createContext()
export const MovieProvider =  props =>{
    return(
        <MovieContext.Provider value={'hey thiis works'}>
            {props.children}
        </MovieContext.Provider>
    )
}
