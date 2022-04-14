import react from "react";
const CartContext= react.createContext({
    items:[],
    totalAmount:0,
    addItems:(item)=>{},
    removeItems:(id)=>{},
    clearItems:()=>{}
})
export default CartContext