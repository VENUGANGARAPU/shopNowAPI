import React,{useContext} from 'react';
import {FilterContext} from './filterContext';
import './styles/filter.css';

function Filter({sideBar,setSidebar} ) {
  const {allproducts,updateFilterValue,clearFilter,filters:{
    text,
    companyname,price,title
  }} = useContext(FilterContext);




  let min="800";
  let max="150000"
  const  filters  = (allproducts,category)=>{
    let items = allproducts.map((eachItem)=>{
      return eachItem[category];
    })
    return (items=["all",...new Set(items)]);
  }
 

  function ratings(){
    let ratings = allproducts.map((eachItem)=>{
      return Math.ceil(Number(eachItem["rating"]));
    });
  
    return (ratings= [...new Set(ratings)].sort().reverse());
  }
  
const byTitle = filters(allproducts,"title");
const byCompany =filters(allproducts,"companyname");
const byPrice =filters(allproducts,"price");
const byRating = ratings();

const  handleChanges =(e)=>{
  e.preventDefault();
}


  return (
    <div>
      <form onSubmit={(e)=>e.preventDefault()}>
        <input type="text" name='text' value={text} onChange={updateFilterValue} style={{margin:'10px'}}></input>
      </form >
      <div className='filter' onClick={()=>setSidebar(false)}>
       <div className='filter'>
                <p style={{fontWeight:'bold',fontSize: 'large'}}>Filters</p>
                <div>
            <button onClick={clearFilter}>Clear</button><p></p>
            {companyname === 'all' ? <p></p>:<button name='companyname' value="all"
                 onClick={updateFilterValue}>{companyname}</button>}
                 {title === 'all' ? <p></p>:<button name='title' value="all"
                 onClick={updateFilterValue}>{title}</button>}
            </div>
            </div>
            <hr></hr>
        <form className='form-data' onClick={handleChanges}>
            <div>
                <p>CATEGORIES</p>  
                <div className='buttons'>
               {byTitle.map((eachitem,index)=>{
                 return <button   key={index} type ='button' name='title' value={eachitem}
                 onClick={updateFilterValue}>{eachitem}</button>
               })}
               </div> 
            </div>
            </form>
            <hr></hr>
              <p>Select by brand</p>
            <form  className='form-data' onClick={handleChanges} action='#'>
              <select className='form-data'  onClick={updateFilterValue} name ="companyname" >
              {byCompany.map((eachitem,index)=>{
                 return  <option key={index} name ="companyname" value={eachitem} >
                  {eachitem}
                 </option>
               })}
              </select>  
            </form>
              <hr></hr>
              <p>Select by ratings</p>
            <div>
            {byRating.map((item, index) => (
            <div key={index}>
              {item === 5 ? <><input  name="rating" value='5' type='checkbox' onChange={updateFilterValue}/>
               <span>5★★★★★</span></>:<><input  name="rating" value={item} type='checkbox' onChange={updateFilterValue}/>
               <span>{item}★& above</span></>}
              
              </div>
              ))}
            </div>
            <hr></hr>
            <div>
            <p>By price {price}</p>
              <input type='range' min={min} max={max} name="price" step="1" value={price} onChange={updateFilterValue}/>
            </div>
            </div>
            
    </div>
  )
}

export default Filter;



