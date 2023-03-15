import React,{useContext,useEffect,useState} from 'react';
import Header from './header';
import './styles/product.css';
import {cartProvider} from "./cartContext.js"
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { api } from '../reducers/apiContext';


const Product = () => {
  const {bagItems,setBagItems} = useContext(cartProvider);
  const {toggle} =useContext(api);
  const[produDetail,setProductdetails] = useState('');
  const[itemAdded,setAddItem]=useState(false);
  const [isloading,setIsloading] =useState(true);

  //to get of the product id
  const id= (useLocation().pathname.split("/")[2]);
useEffect(()=>{
  const setSingleproduct =async ()=>{
    const response = await axios("https://shopnowapi.onrender.com/api/v1/product/find/"+id)
    setProductdetails(response.data);
    setIsloading(false)
  }
  setSingleproduct();

},[id]);



const {img,productName,companyname,productDetails,price,rating,description,_id} =produDetail;

const addItem =(id)=>{
  const fIndId = bagItems.find((eachItem)=> eachItem._id === id);

  if(fIndId){
    setBagItems(bagItems)
  }
  else{
    setBagItems([...bagItems,produDetail])
  }
}

  return <div style={{height:'100vh',overflow:toggle ?'hidden':'auto'}}>
    <Header/>
    {isloading && <h1 style={{color:'purple'}}>... Loading</h1>}
    {produDetail &&
    <section className='section-product'>
    <div className='image-product'>
  <img src={img}alt='cant get'/>
    </div>
    <div className='product-spec'>
      <h4 style={{fontWeight:'500'}}>{productName}</h4>
      <p>{
         [...Array(Math.floor(rating))].map((star, index) => (
          <span key={index} className="star active">
            ★
          </span>
        ))}
        {[...Array(5-Math.floor(rating))].map((star, index) => (
          <span key={index} className="star notactive">
            ★
          </span>
        ))

        }</p>
      <p style={{"color": "rgb(27, 120, 22)", "font-weight": "bold"}}>price</p>
      <h3>₹{price}</h3>
      <h5>Brand : {companyname}</h5>
      <div onClick={()=>setAddItem(true)}><button onClick={()=>addItem(_id)} className='productsButton'>Add to cart</button> 
      <Link to='/cart'><button className='productsButtonCart'>Go to cart</button></Link></div>
       {itemAdded && <b style={{color:'#9E4784'}}>Item Added</b>}
      <div style={{padding:'20px 0px'}}>
        <b>Specifications :</b>
        {
          Object.entries(productDetails).map((eachItem)=>{
            return <><p style={{margin:'10px 0px'}}><b>{eachItem[0]} :</b> {eachItem[1]}</p></>
          })
        }
      <p><b>Description:</b>{description}</p>
      </div>
    </div>
    </section>}
    </div>
}

export default Product;