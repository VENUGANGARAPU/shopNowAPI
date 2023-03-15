import React,{useContext,useEffect} from "react";
import { cartProvider } from "./cartContext";
import { api } from "../reducers/apiContext";
import './styles/cart.css';
import Header from "./header";
import { Link } from "react-router-dom";

const Cart=()=>{

    const{islogged} = useContext(api);
    const {bagItems,removeitem,Increase,Decrease,totalAmount,setTotalamount} = useContext(cartProvider);
    let total=0;
//order delivery time
    const date = new Date();
    const month = date.getMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const deleveryBy =`${monthNames[ month]} ${date.getDate()+5}`;

//total amount

if(bagItems.length >= 1){
    for (let index = 0; index < bagItems.length; index++) {
         (total += bagItems[index].quantity*parseInt(bagItems[index].price.replaceAll(',',"")))
    }
}

useEffect(()=>{
    setTotalamount(total)
},[total]);



    if(bagItems.length === 0){
        return <div>
            <Header/>
            <h1>Your cart is empty add items</h1>
        </div>
    }
    
    return <div>
        <Header/>
        <div className="carts">
        <div className="main-cart">
        <div className='inner-cart'>
        {bagItems.map((item,index)=>{
            const{_id,img,productName,price,quantity} =item;
            return <div key={index} className='cartProduct'>
                <div className="img-cart">
                <img src={img} alt={productName}/>
                <div className="carProduct-details">
                <div>
                <p>{productName}</p>
                <p style={{fontWeight:'600'}}>₹{price}</p>
                <p>free delivery</p>
                </div>
                </div>
                <div style={{marginLeft:'auto'}}>
                <p style={{marginBottom:'0px',fontWeight:'600'}}>Delivery by  {deleveryBy} </p>
                <p style={{color:'green',marginTop:'5px'}}>free ₹0</p>
                </div>
                </div>
                <div className="buttons-cart">
                    <div className="buttons-div">
                <button style={{marginTop:'2px',border:'1px solid #ECF2FF',}} onClick={()=>Increase(_id)}>+</button>
                <p style={{margin:'0px 10px',padding:'0px  ',border:'1px solid #ECF2FF',width:'50px',textAlign:"center"}}>{quantity}</p>
                <button style={{marginTop:'2px',border:'1px solid #ECF2FF',}} onClick={()=>Decrease(_id)}>-</button>
                </div>
                <button onClick={()=>removeitem(_id)} style={{fontWeight:'600'}}>REMOVE</button>
                    </div>
            </div>
        })}
        {!islogged && <p>please login to continue <Link to='/sign in'><button style={{backgroundColor:'orange',border:'unset',height:'25px'}}>sign in</button></Link></p>}
       {islogged && <div className="orderButton"><Link to='/carts/order'><button >PLACE ORDER</button></Link></div>}
    </div>
    <div className="price-cart">
        <p>PRICE DETAILS</p>
        <hr></hr>
        <div className="inner-price-cart">
            <div>
                 <p>Price ({bagItems.length} items)</p>
            </div>
            <div>
                <p>₹{totalAmount.toLocaleString('en-IN')}</p>
            </div>
        </div>
        <div className="inner-price-cart">
            <div>
                 <p>Discount</p>
            </div>
            <div>
                <p>₹0</p>
            </div>
        </div>
        <div className="inner-price-cart">
            <div>
                 <p>Delivery Charges</p>
            </div>
            <div>
            <p style={{color:'green',marginTop:'5px'}}>free ₹0</p>
            </div>
        </div>
        <div className="inner-price-cart">
            <div>
                 <p>Packaging Fee</p>
            </div>
            <div>
                <p>₹50</p>
            </div>
        </div>
        <hr></hr>
        <div className="inner-price-cart">
            <div>
                <h4>Total Amount :</h4>            
            </div>
            <div>
                <h4>₹{(totalAmount +50).toLocaleString('en-IN')}/-</h4>
            </div>
        </div>
    </div>
    </div>
    </div> 
    </div>
}

export default Cart;