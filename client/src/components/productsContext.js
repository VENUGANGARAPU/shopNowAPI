import React,{useEffect, useReducer} from 'react'
import axios from 'axios';



const productContext = React.createContext();

const initialState ={
  productsData:[],
  feautreProducts:[]
};



const Contextproduct = ({children}) => {

    const reducer = (state,action) => {
    switch (action.type) {
      case "Productsdata":
         return {
        ...state,
        productsData:action.payload
        }
      
      default:
        return state;
    }
  }

  
  const [state,dispatch] = useReducer(reducer,initialState);
  useEffect(()=>{
    const getProducts = async()=>{
      const response = await axios("https://shopnowapi.onrender.com/api/v1/product/getProducts");
      dispatch({type:"Productsdata",payload:response.data});
    }
    getProducts();
  },[initialState]);

  return (
    <productContext.Provider value={{...state}}>
      {children}
    </productContext.Provider>
  )
}

export  {Contextproduct,productContext};