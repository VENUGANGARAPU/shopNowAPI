
export const reducer =(state,action)=>{
        switch (action.type) {

            case "all_products" :
                return {
                    ...state,
                    allproducts:[...action.payload],
                };
            case "filter_products" :
                  let {allproducts} =state;
                  let temFilterProducts =[...allproducts];
                  const {title,companyname,rating,price,stockClearance,text} =state.filters;

                  if(text){
                    temFilterProducts = allproducts.filter((curremle)=>{
                      return curremle.productName.toLowerCase().startsWith(text);

                    })
                  }




                  if(title !== "all" ){
                    temFilterProducts = temFilterProducts.filter((curremle)=>{
                      return curremle.title === title;
                    });
                  }

                  if(companyname !== "all" ){
                    temFilterProducts = temFilterProducts.filter((curr)=> {
                      return curr.companyname === companyname })

                    }
                  if(stockClearance ){
                    temFilterProducts = temFilterProducts.filter((curr)=> {
                      if(curr.stockClearance === stockClearance ) {
                        console.log(curr)
                        return curr
                      }
                    });
                  }
                    
                   if(rating){
                      temFilterProducts = temFilterProducts.filter((curr)=>{
                        return Math.floor(Number(curr.rating)) === Number(rating);
                      })
  
                    }
                    if(price){
                      temFilterProducts = temFilterProducts.filter((curremle)=>{
                        return ( (curremle.price <= price)) ;
                      });
                    }
                 
                  return {
                      ...state,
                      filterProducts:temFilterProducts
                    }
                  
              case "filterByType" :
                const {name ,value} = action.payload;
                  return {
                    ...state,
                    filters:{
                      ...state.filters,
                      [name] : value,
                    },
                  }



              case "clearfilter":
                    return {
                      ...state,
                      filters:{
                        ...state.filters,
                        text:"",
                        title:"all",
                        companyname:"all",
                        rating:"",
                        price:0
                      }
                    }
                 
            default:
              return state;
        }
    }
