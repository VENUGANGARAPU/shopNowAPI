import React,{createContext,useState,useContext, useEffect} from 'react'
import axios from 'axios';
import {api} from '../reducers/apiContext';

const cartProvider = createContext();


function CartContext({children}) {

  const{currentuser,Token} = useContext(api);
    const [bagItems,setBagItems] = useState([]);
    const [totalquantity,setTotal] = useState([]);
    const [userCart,setUsercart] = useState({});
    const[totalAmount,setTotalamount] =useState(0);
    const [ordersdata,setOrdersData] = useState(false);


useEffect(()=>{

  const getData = async()=>{
    const cartItems =await axios.get(`https://shopnowapi.onrender.com/api/v1/cart/getcarts/${currentuser._id}`,{
        headers: {token:Token }
    });
    if(cartItems.data == null){
      const userId = currentuser._id;
     const postData = async()=>{
     const usercart =await axios.post('https://shopnowapi.onrender.com/api/v1/cart',{userId},{
         headers: {token:Token }
     });
     setUsercart(usercart.data);
  }
  currentuser && Token && postData();
    }
    else{
      setUsercart(cartItems.data);
      setBagItems(cartItems.data.products);
    }
 }

currentuser && getData();
},[currentuser]);

useEffect(()=>{

  const getData = async()=>{
    const cartItems =await axios.get(`https://shopnowapi.onrender.com/api/v1/order/find/${currentuser._id}`,{
        headers: {token:Token }
    });
    if(cartItems.data == null){
      const userId = currentuser._id;
     const postData = async()=>{
     const usercart =await axios.post('https://shopnowapi.onrender.com/api/v1/order',{userId},{
         headers: {token:Token }
     });
  }
  currentuser &&  postData();
 }
}
currentuser && getData();
},[ordersdata]);

useEffect(()=>{
  
  const update =async()=>{
    let user ={products:bagItems};
    try {
      const updateCart = await axios.put(`https://shopnowapi.onrender.com/api/v1/cart/${userCart._id}`,user,{
        headers:{token :Token}
      });
    } catch (error) {
      console.log(error);
    }
  }

  currentuser &&  update()

},[bagItems]);


    const removeitem=(id)=>{ 
      const remainingItem = bagItems.filter((eachItem,index)=>{
          return  eachItem._id !== id;
      });
      setBagItems(remainingItem);
  }

  const emptyCart =()=>{
    setBagItems([]);
  }
   
  const Increase =(id)=>{
    const increase = bagItems.map((eachItem)=>{
      if(eachItem._id === id){
        return {...eachItem,quantity:eachItem.quantity+1}
      }
      return eachItem;
    });
   
    setBagItems(increase);
  }


  const Decrease =(id)=>{
    const remaing = bagItems.map((eachItem,index)=>{
      if(eachItem._id === id){
        return   {...eachItem,quantity:eachItem.quantity-1};
      }
      return eachItem;
  }).filter((eachItem)=> eachItem.quantity !== 0);

  setBagItems(remaing);
  }
   

  return (
    <cartProvider.Provider value={{bagItems,setBagItems,removeitem,emptyCart,Increase,Decrease,totalquantity,userCart,totalAmount,setTotalamount}}>
        {children}
    </cartProvider.Provider>
  )
}

export  {CartContext,cartProvider};