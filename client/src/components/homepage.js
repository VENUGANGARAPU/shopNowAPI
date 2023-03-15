import React,{useState,useEffect,useContext} from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import {GrFormNext,GrFormPrevious} from 'react-icons/gr'
import './styles/homepage.css'
import { sliderData } from "../data/sliderData";
import { productContext } from "./productsContext";
import { FilterContext } from "./filterContext";
import { api } from "../reducers/apiContext";

const Homepage =()=>{
  const {productsData} = useContext(productContext);
  const{toggle} =useContext(api);
  const{updateFilterValue} = useContext(FilterContext);
  const [positionSlider,setPosition]=useState(0);

const topSelling =productsData.filter((eachItem)=> eachItem.Topselling === true);
const bestOfCollection = productsData.filter((eachItem)=>eachItem.bestOfCollection === true)


  useEffect(()=>{
    if(positionSlider <0){
      setPosition(sliderData.length-1);
    }
    if(positionSlider >sliderData.length-1){
      setPosition(0);
    }
  },[positionSlider]); 


  useEffect(() => {
    let slider = setInterval(() => {
      setPosition(positionSlider + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [positionSlider]);
  
    return <>
    <div className="homepage" style={{ overflow: toggle ? 'hidden' : 'auto'}}>
    <Header/>
    <div className="main" style={{ opacity: toggle ? '0.3' : '1'}}>
          <div className= "slider-main" > 
          {
            sliderData.map((eachItem,index)=>{
              const {image,id,title}= eachItem;
              let slider ="nextslide"
              if( index === positionSlider ){
                slider="activeslide"
              }
              if(index<positionSlider){
                 slider ="prevslider"
              }
              return<article key={id} className= {slider} >
                <Link className="link" to={`/product/${id}`}>
            <img src={image}/></Link>
              </article>
            })
          }
        <button className="prev" onClick={()=>setPosition(positionSlider-1)}><GrFormPrevious/></button>
        <button className="next" onClick={()=>setPosition(positionSlider+1)}><GrFormNext/></button>
        </div>

        <div className="baner-1">
          <div className="homepage-adv">
            <div className="baners" onClick={updateFilterValue}>
             <Link className="link" to='/electronics'><h3>Up to 70% off | Clearance store</h3>
              <img src='image/stockclearences.jpg' ></img>
              <p >see more</p></Link> 
            </div>
          </div>

          <div className="homepage-adv">
            <div className="baners">
              <Link className="link" to='product/64095037ec60fcecbdb66056'>
              <p style={{fontWeight:'bold'}}>Price Drop ON</p>
              <p>Mi Smart Tvs</p>
              <img src='https://m.media-amazon.com/images/I/81oHGrH1PwL._SL1500_.jpg'></img>
              <p style={{fontSize:'smaller',color:'green'}}>from <span>₹13,999</span></p>
              <p>On sale</p></Link>
            </div>
          </div>

          <div className="homepage-adv">
              <p>Smart watches</p>
            <div className="baners">
           <Link className="link" to='product/64096dc4ec60fcecbdb660f8'>
              <img src='image/smartwatches1.jpg'></img>
              <p style={{fontSize:'smaller',color:'green'}}>from <span>₹799</span></p>

             <p>see more</p></Link>
            </div>
          </div>

          <div className="homepage-adv">
            <div className="baners">
              <div className="banners-inner">
                <div className="banners-inner2"><Link className="link" to='product/6409589aec60fcecbdb66062'><img src='https://m.media-amazon.com/images/I/51-y23++4iL._SY355_.jpg'></img><p>webCams</p></Link></div>
                <div className="banners-inner2"><Link className="link" to='product/64095af3ec60fcecbdb66066'><img src='image/powerbanks.jpeg'></img><p>powerbanks</p></Link></div>
              </div>
              <div className="banners-inner">
              <div className="banners-inner2"><Link className="link" to='product/64095c23ec60fcecbdb66068'><img src='image/bands.jpeg'></img><p>smart band</p></Link></div>
              <div className="banners-inner2"><Link className="link" to='product/6409589aec60fcecbdb66062'><img src='https://static-ecapac.acer.com/media/mf_webp/jpg/media/catalog/product/cache/a2e755bb2f5b00fa33d64eface9107e3/u/m/um.iv6ss.b08-main_1.webp'></img><p>Monitors</p></Link></div>
            </div>
            <Link to='/electronics'>
            <p>see more</p>
            </Link>
            </div>
          </div>
        </div>


        <div className="singleProductSlide">
          <div className="product-main">
            <div>
            <h4>Best of our collection</h4>
            <button>VIEW ALL</button>
            </div>
          {bestOfCollection.map((product)=>{
            const{title,_id,companyname,price,img}=product;
            return<div key={_id} className="product">
             <Link className="link"  to={`/product/${_id}`}> <img style={{height:'6rem'}} src={img}></img>
              <p>{title}</p>
              <p style={{color :'green'}}>from</p>
              <p> ₹{price}</p></Link>
            </div>
          })}
           </div>
           </div>
           <div className="baner-1">

           <div className="homepage-adv">
            <div className="baners">
              <div className="banners-inner">
                <div className="banners-inner2"><Link className="link" to='product/640961a2ec60fcecbdb66096'><img src='image/speaker.jpg'></img><p>speakers</p></Link></div>
                <div className="banners-inner2"><Link className="link" to='product/64096d22ec60fcecbdb660f4'><img src='https://m.media-amazon.com/images/I/61rKklSHqPL._SL1500_.jpg'></img><p>Chargers</p></Link></div>
              </div>
              <div className="banners-inner">
              <div className="banners-inner2"><Link className="link" to='product/64096bdeec60fcecbdb660f0'><img src='https://resource.logitech.com/w_572,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/mice/m190-wireless-mouse/m190-wireless-mouse-red-gallery-04.png?v=1AAAAAAAAAB//9k='></img><p>mouse</p></Link></div>
              <div className="banners-inner2"><Link className="link" to='product/64096dc4ec60fcecbdb660f8'><img src='image/smartwatches.jpg'></img><p>powerbanks</p></Link></div>
            </div>
            <Link to='/electronics' >
            <p>see more</p>
            </Link>
            </div>
          </div>

          <div className="homepage-adv">
            <div className="baners">
            <Link className="link" to='product/63f70fd2bcc28ec01bcf53d3'>
              <img src='image/samsung a7.jpg'></img>
              <p>Samsung Galaxy Tab A7</p>
              <p style={{fontSize:'smaller',color:'green'}}>from</p>
              <p>₹19,999</p></Link>
            </div>
          </div>

          <div className="homepage-adv">
            <div className="baners">
            <Link className="link" to='product/64096facec60fcecbdb66104'>
              <img src='https://m.media-amazon.com/images/I/711yJipUQVL._SL1500_.jpg'></img>
              <p>Printers</p>
              </Link>
            </div>
            <div className="baners">
            <Link className="link" to='product/640970caec60fcecbdb6610a'>
              <img src='https://images-eu.ssl-images-amazon.com/images/I/8150iUXkc5L._AC_UL600_SR600,400_.jpg'></img>
              <p>Monitors</p>
              </Link>
            </div>
          </div>

          <div className="homepage-adv">
            <div className="baners">
              <Link to='/electronics'><button name='stockClearance' value='70' onClick={updateFilterValue}><img src='image/laptopweb.jpg' ></img></button></Link>
            </div>
            <p>Sign in for your best experience</p>
            <Link to='/sign in'>
            <button className="button">sign in securely</button></Link>
          </div>
            </div>   


           <div className="singleProductSlide">
            <div style={{textAlign: 'left'}}><h2>Top sellings</h2></div>
           <div>
             <div className="product-main">
          {topSelling.map((product)=>{
            const{title,_id,companyname,price,img}=product;
            return<div key={_id} className="product"><Link to={`product/${_id}`} className="link">
              <img style={{height:'6rem'}} src={img}></img>
              <p>{companyname}</p>
              <p style={{color :'green'}}>from</p>
              <p> ₹{price}</p></Link>
            </div>
          })}
          <div>
            <h4>Top selling products </h4>
            <Link to='/electronics' className="link">
            <button>VIEW ALL</button>
            </Link>
            </div>
           </div>
           </div>
           </div>
           <Footer/>
        </div>
        </div>
        </>
}

export default Homepage;