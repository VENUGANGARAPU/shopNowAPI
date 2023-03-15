import React,{useContext, useState}from 'react';
import {FaCartPlus} from 'react-icons/fa';
import {BsPersonPlusFill} from 'react-icons/bs';
import './styles/header.css';
import { Link } from 'react-router-dom';
import { api } from '../reducers/apiContext';


function Header() {

  const {setuser,islogged,setLogged,toggle,setToggle} = useContext(api);



  const logout=()=>{
    setuser('')
    setLogged(false)
  }

 
  return (
    <div className="headers">
      <section className='main-header'>
      <nav className='navBar'>
        <div><h1>ShopNow</h1></div>
      <div className={toggle ?'about activeSlide' :'about' } onClick={()=>setToggle(false)}>
        <Link className='links'  to='/'>
           <div >
           <p>Home</p>
           </div>
           </Link>
           <Link className='links' to='/electronics' >
           <div >
           <p  >Products</p>
           </div>
           </Link>
           <Link className='links' to='/electronics' >
           <div >
           <p >About</p>
           </div>
           </Link>
          {!islogged && <Link className='links' to='/sign in'><p>Sign in <BsPersonPlusFill style={{ fontSize: '20px',height:'1rem'}}/></p></Link>}
          {islogged && <p onClick={()=>logout()}>LogOut</p>}
             <Link className='links' to='/orders' > <p>Orders</p></Link>
             <Link className='links' to='/cart'><div className='cartss'><FaCartPlus style={{color: toggle ? '#FD841F' :'white', fontSize: '30px'}} className='cart'/></div></Link>
        </div>
        <div className='button-toggle'>
        {!toggle &&  <i className="fa-solid fa-bars" style={{ fontSize: '20px'}} onClick={()=>setToggle(true)}></i>}   
        {toggle && <i className="fa-solid fa-xmark"  style={{color:'red', fontSize: '20px'}} onClick={()=>setToggle(false)}></i>}
        </div>
        </nav>
      </section>
    </div>
  );
}

export default Header;