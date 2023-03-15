import React,{useState} from 'react'
import './styles/signIn.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

export const CreateAccount = () => {


   const [username,setUsername] = useState('');
   const [email,setEmail] = useState('');
   const [password,setpassword] = useState('');
   const[status,Setstatus] =useState('');
   const[error,setError]=useState('');

   const handlechanges =(e)=>{
      e.preventDefault();
      const newUser =async()=>{
         try {
            const register= await axios.post('https://shopnowapi.onrender.com/api/v1/register',{username,email,password});
            console.log(register.data);
            Setstatus(register.data.username);
            
         } catch (error) {
            setError("user name already exists");
         }
      }
      newUser();
   }
   const reload =()=>{
      window.location.reload();
    }
    console.log(status)


  return (
   <div> <Link to='/'><h1 style={{textAlign:'center',color:'#7286D3',margin:'20px'}}>ShopNow</h1></Link>
    <div className='main-signin'>
    <form onSubmit={handlechanges}>
    <div className='signin'>
         <h4>Create Account</h4>
         <p style={{color:'red'}}>{error}</p>
         <div className='middle'>
            <p>Your Name</p>
            <input type='text' name='username' value={username} required onChange={(e)=>setUsername(e.target.value)}></input>
         </div>
         <div className='middle'>
            <p>Email</p>
            <input type='text' name='email' value={email} required onChange={(e)=>setEmail(e.target.value)}></input>
         </div>
         <div className='middle'>
            <p>Password</p>
            <input type='password'  name='password' required value={password} onChange={(e)=>setpassword(e.target.value)}></input>
         </div>
         <p>By signing up, you agree to our terms of service and privacy policy.</p>
         <button type='submit' disabled={error || status }>Continue</button><p/>
         {error && <button style={{color:'red',backgroundColor:'white'}} onClick={reload}>Reload page</button>}
         {status && <div><p style={{color:'green'}}>Accout created succefully please login</p><Link to='/sign in'><button>sign In</button></Link></div>}
    </div>
    </form>
    </div>
    </div>

  )
}
