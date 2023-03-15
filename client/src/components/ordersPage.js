import React,{useEffect,useContext,useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { api } from '../reducers/apiContext';
import './styles/orders.css'
import Header from './header';



const Orderspage = () => {

  const {currentuser,Token,islogged} = useContext(api);
  const [orders,setOrders] = useState([]);
  const [isloading,setIsloading] =useState(true);

 useEffect(()=>{
   const getOrders =async()=>{
    const response =await  axios.get(`https://shopnowapi.onrender.com/api/v1/order/find/${currentuser._id}`,{
      headers:{token : Token}
    })
    setOrders(response.data);
    setIsloading(false);
  }
  currentuser && getOrders(); 
},[currentuser]);
console.log(orders)
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];


  return (<>
    <div className='order'>
              <Header/>
              {!currentuser ? <div><h1>Login to View your Orders </h1><p><Link to='/sign in'>Click here to login</Link></p> </div>: <>
              <h2 style={{margin:'10px'}}>Your Orders</h2>
      <div className='orders-main'>
        {isloading && <h1 style={{color:'purple'}}>... Loading</h1>}
        {orders && orders.map((eachOrder)=>{
          const {address,amount,products,status,createdAt}=eachOrder;
          let dates = new Date(createdAt);
          return <div>
            <p style={{textAlign:'left',marginLeft:'10px'}}>Ordered on <b>{dates.getDate()} {monthNames[dates.getMonth()+1]} {dates.getFullYear()}</b></p>
            <div className='orders-main1'>
            <div>{products.map((product)=>{
            return<div className='orders-main2'>
              <div className='orders-article'>
              <Link to={`/product/${product.productId}`}>
              <img src={product.img}></img>
              </Link>
              <div className='order-productDetails'>
                <p style={{fontWeight:'600'}}>{product.productName}</p>
                <p style={{color:'green'}}>price</p>
                <p  style={{fontWeight:'600'}}> ₹{product.price}</p>
              <p>quantity :{product.quantity}</p>
              </div>
            </div>
              </div>
            })}</div>
            <div style={{textAlign:'left'}}>
            <p>order status:<b>{status}</b></p>
            <p>Total amount to be paid :<b>₹{amount}</b></p>
            </div>
            </div>
            </div>
          })}
      </div>
      </>}
    </div>
</>
  )
}

export default Orderspage