import React,{useContext, useState,useEffect} from "react";
import Header from "./header";
import './styles/electronics.css';
import Filter from "./filter";
import Products from "./products";
import { api } from "../reducers/apiContext";

const Electronics =()=>{
    const{toggle} =useContext(api);
const[sideBar,setSidebar] = useState(false);


    return <div style={{height:'100vh',overflow:toggle||sideBar ?'hidden':'auto'}}> 
    <Header/>
    <div>
        <h1 style={{color:'#0E8388',paddingTop:'10px'}}>Our Products</h1>
         {!sideBar && <button onClick={()=>setSidebar(true)}>Filters</button>}
         {sideBar &&<button onClick={()=>setSidebar(false)}>close Filters</button>}
    <div className="main-electronicsCont">
        <div className={sideBar ?'filter-conatiner activeSidebar' : 'filter-conatiner'}>
            <Filter sideBar={sideBar} setSidebar={setSidebar}/>
        </div>
        <div className="items-container">
             <Products />
        </div>
        </div>
    </div>
    </div> 
}

export default Electronics;