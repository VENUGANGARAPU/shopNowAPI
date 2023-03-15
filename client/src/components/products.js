import React,{useContext} from "react";
import Singleitem from "./singleProducts";
import './styles/products.css'
import { FilterContext } from "./filterContext";

const Products =()=>{
    const {filterProducts} = useContext(FilterContext);
    return <section className="products-container" >
        <div className="products-main">
        {filterProducts.map((eactItem)=>{
            const{id,type} =eactItem;
            return <>
                <Singleitem key={id} item={eactItem}/>
                    </>
                })}
         </div>
         {filterProducts && <p>Item note found</p>}
    </section>
}

export default Products;