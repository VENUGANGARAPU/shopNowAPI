import React, { useContext, useEffect } from "react";
import './styles/singleProducts.css';
import { Link } from "react-router-dom";
import {cartProvider} from "./cartContext.js"

const Singleitem =({item} )=>{
    const {bagItems,setBagItems} = useContext(cartProvider);

    const{img,productName,company,price,_id,rating}=item;
    const movetobag=()=>{
        const data = [...bagItems,item];
        setBagItems(data);
    }
   
    return <>
    < div className="singleProduct-main ">
        <Link to={`/product/${item._id}`}>
        <div className="singleProduct-items">
         <img src={img}/>
         <p>{productName}</p>
         <div style={{textAlign:'center'}}><p style={{backgroundColor:'rgb(27, 120, 22)',color:'whitesmoke',width:'fit-content',borderRadius:'2px',fontSize:'12px',padding:'2px'}}>{rating} ★</p>
</div>
         <p>Free delivery</p>
         <p style={{fontWeight:'600',fontSize:'16px'}}>₹{price}</p>
         <p style={{color:'rgb(27, 120, 22)',fontWeight:'bold'}}>Bank offer</p>
        </div>
        </Link>
    </div>
    </>    
}

export default Singleitem;
