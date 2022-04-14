import classes from './Cart.module.css'
import Modal from '../UI/Modal'
import CartContext from '../store/cart-context'
import React,{ useContext , useState} from 'react'
import CartItem from './CartItem'
import Checkout from './Checkout'
const Cart = props => {
    const cartCtx=useContext(CartContext)
    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`
    const hasItems= cartCtx.items.length >0
    const [orderclicked, setorderClicked]=useState(false)
    const [isSubmitting, setIsSumbitting]=useState(false)
    const [didSubmit, setDidSumbit]=useState(false)

    const cartItemRemovehandler=id=>{
        cartCtx.removeItems(id)
    }
    const cartItemAddHandler =item=>{
        cartCtx.addItems({...item,amount:1})
    }
    const onOrderHandler=()=>{
        setorderClicked(true)
    }
    const submitOrderHandler= async(userData)=>{
        setIsSumbitting(true)

        const response = await fetch('https://reactfoodapp-34f79-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body: JSON.stringify({
                user:userData,
                orderedItems:cartCtx.items,
                orderDate:new Date().toLocaleString()
            })
        })

        if(!response.ok){
            return
        }
        setIsSumbitting(false)
        setDidSumbit(true)
        cartCtx.clearItems()
    }
    const cartItems=(
        <ul className={classes['cart-items']}>{
        cartCtx.items.map(item => <CartItem
        key={item.id} name={item.name} amount={item.amount} price={item.price}
        onRemove={cartItemRemovehandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}
        ></CartItem>)}
      </ul>)

    const modalActions=(<div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
        {hasItems && <button className={classes.button} onClick={onOrderHandler}>Order</button>}
    </div>)

    const cartModalContent=(
        <React.Fragment>
            {cartItems}
              <div className={classes.total}>
                  <span>Total Amount</span>
                  <span>{totalAmount}</span>
              </div>
              {orderclicked && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler}/>}
              {!orderclicked && modalActions}
        </React.Fragment>
    )
     const cartSumbitingContent=(<p>Sending order data...</p>)

    const cartSumbittedContent=(<p>Your order has been placed successfully...</p>)
      return(
          <Modal onClose={props.onClose}>
              {!isSubmitting && !didSubmit && cartModalContent}
              {isSubmitting && cartSumbitingContent}
              {didSubmit && cartSumbittedContent}
          </Modal>
      )

}
export default Cart