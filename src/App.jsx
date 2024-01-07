import React, {useEffect, useState} from 'react'

import "./App.css"
import Navbar from './components/Navbar/Navbar';
import Routing from './components/Routing/Routing';
import { getJwt, getUser } from './services/userServices';
import setAuthToken from './utils/setAuthToken';
import { addToCartAPI, getCartAPI } from './services/cartServices';

setAuthToken(getJwt());

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    try {
      const jwtUser = getUser();
      if(Date.now() >= jwtUser.exp * 1000) {
        localStorage.removeItem("token");
        location.reload();
      }
      setUser(jwtUser);
    } catch (err) {};
  }, [])

  const addToCart = (product, quantity) => {
    const updatedCart = [...cart]
    const productIndex = updatedCart.findIndex(item => item.product._id === product._id)

    if(productIndex === -1) {
      updatedCart.push({product: product, quantity: quantity});
    } else {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    
    addToCartAPI(product._id, quantity).then((res) => {
        console.log("Product added successfully!");
      }).catch((err) => {
        console.log("Failed to add product!");
        setCart(cart);
      });
  };

  const getCart = () => {
    getCartAPI().then(res => setCart(res.data)).catch(err => console.log("Something went wrong!"))
  }

  useEffect(() => {
    if(user){
      getCart();
    }
  },[user])

  return (
    <div className='app'>
      <Navbar user={user} cartCount={cart.length}/>
      <main>
        <Routing addToCart={addToCart} cart={cart}/>
      </main>
    </div>
  )
}

export default App