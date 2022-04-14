import Header from "./Layout/Header";
import { useState } from "react";
import Meals from "./Meals/Meals";
import Cart from "./Cart/Cart";
import CartProvider from "./store/CartProvider";
import Orders from "./Layout/Orders";

function App() {
  const[cartIsShown, setIsCartShown]= useState(false);
  const[orderIsShown, setIsOrderShown]= useState(false);
  const showCartHandler=()=>{
    setIsCartShown(true)
  }
  const hideCartHandler=()=>{
    setIsCartShown(false)
  }
  const showOrderHandler=()=>{
    setIsOrderShown(true)
  }
  const hideOrderHandler=()=>{
    setIsOrderShown(false)
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      {orderIsShown && !cartIsShown && <Orders onClose={hideOrderHandler}/>}
      <Header onShowCart={showCartHandler} onShowOrder={showOrderHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
