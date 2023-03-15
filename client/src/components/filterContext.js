import React,{createContext,useContext,useReducer,useEffect, useState} from 'react'
import { productContext } from './productsContext';
import { reducer } from './filterReducer';

const FilterContext = createContext();



const FilterContextProvider = ({children}) => {
    
  const {productsData} = useContext(productContext);
  const [searchvalue,setsearch]=useState('');

  const updateFilterValue =(event)=>{
   let name = event.target.name;
   let value =event.target.value;
  return dispatch({type :"filterByType",payload:{name,value}});
  }

  const clearFilter =()=>{
    dispatch({type:"clearfilter"})
  }


  const setItemsInitial =()=>{
    dispatch({type :"all_products",payload:productsData})
  }


  const initialState = {
    filterProducts:[],
    allproducts : [],
    filters:{
      text:"",
      title:"all",
      companyname:"all",
      productName:"",
      rating:"",
      stockClearance:"",
      price:0,
    },
    updateFilterValue,
    clearFilter,
    setItemsInitial,
  }


    const [state,dispatch] = useReducer(reducer,initialState);

    useEffect(()=>{
        dispatch({type :"all_products",payload:productsData})
        dispatch({type :"filter_products",payload:productsData})
    },[productsData,state.filters]);

  return (
    <FilterContext.Provider value={{...state,setsearch,searchvalue}}>
        {children }
    </FilterContext.Provider>
  )
}

export  {FilterContext,FilterContextProvider};