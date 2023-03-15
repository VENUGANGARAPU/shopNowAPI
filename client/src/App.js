import React, { useContext } from 'react';
import {BrowserRouter as Router, Routes,Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Homepage from './components/homepage';
import Electronics from './components/electronics';
import Cart from './components/cart';
import { SignIn } from './components/signIn';
import { CreateAccount } from './components/register';
import {Contextproduct} from './components/productsContext';
import { FilterContextProvider } from './components/filterContext';
import { CartContext } from './components/cartContext';
import Product from './components/product';
import { Apicalls ,api} from './reducers/apiContext';
import Orderspage from './components/ordersPage';
import Order from './components/order';

const contextProvider = React.createContext();



function App() {
    

  return (
    <>
    <Apicalls>
    <Contextproduct>
    <CartContext>   
    <FilterContextProvider>
    <Router>
    <Routes>
      <Route index element={<Homepage/>}></Route>
      <Route path='/electronics' element={<Electronics/>}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/sign in' element={<SignIn/>}></Route>
      <Route path='/create Account' element={<CreateAccount/>}></Route>
      <Route path='/product' element={<Product/>}></Route>
      <Route path ='/orders' element={<Orderspage/>}></Route>
      <Route path='/product/:id' element={<Product/>}></Route>
      <Route path='/carts/order' element={<Order/>}></Route>
    </Routes>
    </Router>
    </FilterContextProvider>
    </CartContext>  
    </Contextproduct>
    </Apicalls>
    </>)
}

export  {App,contextProvider};
