import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';
import CartContext from '../store/cart-context';
import { useContext, useEffect, useState } from 'react';

const HeaderCartButton = props =>{
    const[buttonisHightlighted, setButtonhigh]=useState(false)

    const cartCtx=useContext(CartContext)
    const numberofCartItems= cartCtx.items.reduce((curNumber,item)=>{ return curNumber + item.amount},0)
    const btnClass=`${classes.button} ${buttonisHightlighted ? classes.bump : ''}`
    const {items}=cartCtx;
    useEffect(()=>{
        if(cartCtx.items.length === 0){
            return;
        }
        setButtonhigh(true)
        const timer= setTimeout(()=>{ setButtonhigh(false)},300);
        return ()=>{clearTimeout(timer)}
        // eslint-disable-next-line 
    },[items])
    return <button className={btnClass} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon></CartIcon>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberofCartItems}</span>
    </button>
}
export default HeaderCartButton;