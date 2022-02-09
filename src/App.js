import Header from "./Layout/Header";
import { useState } from "react";
import Meals from "./Meals/Meals";
import Cart from "./Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const[cartIsShown, setIsCartShown]= useState(false);
  const showCartHandler=()=>{
    setIsCartShown(true)
  }
  const hideCartHandler=()=>{
    setIsCartShown(false)
  }
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
