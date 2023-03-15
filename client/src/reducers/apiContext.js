import React,{useState,createContext,useReducer, useEffect} from "react";

const api = createContext();



function Apicalls({children}){

const[currentuser,setuser] =useState();
const[islogged,setLogged] =useState(false)
const [toggle,setToggle] =useState(false);

currentuser && localStorage.setItem('jwttoken',`Barrer ${currentuser.acesstoken}`)
let Token =currentuser && localStorage.getItem('jwttoken');

    return(
        <api.Provider value={{currentuser,setuser,islogged,setLogged,toggle,setToggle,Token}}>
            {children}
        </api.Provider>
    )
}

export {Apicalls,api};


