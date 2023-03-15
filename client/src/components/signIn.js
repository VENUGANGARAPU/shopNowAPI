import React,{useState, useContext} from 'react';
import axios from 'axios';
import {  Link,Navigate } from 'react-router-dom'
import './styles/signIn.css';
import { api } from '../reducers/apiContext';

export const SignIn = () => {
const {currentuser,setuser,setLogged} = useContext(api)
  const[username,setUsername]= useState("");
  const[password,setpassword]= useState("");
  const[error,setError] = useState('')

const  handlechanges =(e)=>{
  e.preventDefault();
 
  const postData =async()=>{
  try {
        const res = await axios.post('https://shopnowapi.onrender.com/api/v1/login',{username,password});
        setuser(res.data);
        setLogged(true);
      }
  catch (error) {
      console.log("error");
      setError('username and password dose not exists ')
    }
  }
  postData();
}

const reload =()=>{
  window.location.reload();
}

  return (
    <div>
      {currentuser && <Navigate to='/'/>}
      <h1 style={{textAlign:'center',color:'#7286D3',margin:'20px'}}>ShopNow</h1>
    <div className='main-signin'>
      <h2>Sign-in</h2>
      <section className='signin'>
      <p style={{color:'red'}}>{error}</p>
      <form onSubmit={handlechanges} >
         <div className='middle'>
            <p>User name</p>
            <input type='text' name='username' required onChange={(e)=>setUsername(e.target.value)}></input>
         </div>
         <div className='middle'>
            <p>Password</p>
            <input type='text' name='password' required onChange={(e)=>setpassword(e.target.value)}></input>
         </div>
         <button type='submit' disabled={error}>Sign In</button>
          {error && <button style={{color:'red',backgroundColor:'white'}} onClick={reload}>Reload page</button>}
          </form>
         <p style={{fontSize:'10px'}}>By signing up, you agree to our terms of service and privacy policy.</p>
         <hr/>
          <Link to='/create Account' style={{paddingLeft:'20px'}}><button >Create your Accout</button></Link> 
    </section>
    
    </div>
    </div>
  )
}
