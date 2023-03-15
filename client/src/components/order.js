import React,{useState,useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';
import {api} from '../reducers/apiContext';
import { cartProvider } from "./cartContext";
import axios from 'axios';
import './styles/orders.css';

function Order() {
    
  const {bagItems,totalAmount,setBagItems} = useContext(cartProvider);
  const{Token,currentuser} = useContext(api);
  const[postdata,setPostdata] =useState(false);
  const [addres,setAddress] =useState({name:'',houseNo:"",villageAndDistrict:'',state:'',pincode:''});

  const product =bagItems.map((eachItem)=>{
    return { productId:eachItem._id,quantity:eachItem.quantity,img :eachItem.img,price:eachItem.price,productName:eachItem.productName}
  });

  
  
  
  const orderDetails ={
    userId :currentuser._id,
    products:product,
    amount:totalAmount,
    address:addres
  }

  
  const getOrders = async()=>{
    const order = await axios.post('https://shopnowapi.onrender.com/api/v1/order',orderDetails,{
        headers:{token :Token}
      })
  }



  const handlesubmit =(e)=>{
    e.preventDefault();
    setPostdata(true);
  }
  const handlechanges =(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setAddress({...addres,[name]:value})
  }


console.log(addres)
if(postdata){
  return <div>
    <h1 style={{color:'green'}}>order success</h1>
    <Link to='/'>
    <button  style={{backgroundColor:'orange',color:'white',border:'unset'}}  onClick={()=>setBagItems([])   }>back to Homepage</button>
    </Link>
    </div>
}

  return (
    <div className='orderPage'>
      <p >Add address to place Order</p>
      <form onSubmit={handlesubmit}>
        <div className='form-orders' style={{display:'flex',justifyContent:'space-between'}}>
        <label>Name :</label>
        <input  type='text' name='name' value={addres.name} onChange={handlechanges} required></input></div>
        <div className='form-orders' >
        <label>House number :</label>
        <input type='text'  name='houseNo' value={addres.houseNo} onChange={handlechanges} required></input>
        </div>
        <div className='form-orders'> <label>Village & District :</label>
        <input type='text'  name='villageAndDistrict' value={addres.villageAndDistrict} onChange={handlechanges} required></input></div>
        <div className='form-orders'> <label>State :</label>
           <input type='text'  name='state' value={addres.state} onChange={handlechanges} required></input>
        </div>
        <div className='form-orders'>  
          <label>Pincode :</label>
          <input type='text' name ='pincode' value={addres.pincode} onChange={handlechanges} required></input>
        </div>
        <button type='submit' style={{backgroundColor:'orange',color:'white',border:'white',padding:'5px',marginTop:'10px'}} onClick={getOrders}>confirm order</button>
      </form>
    </div>
  )
}

export default Order