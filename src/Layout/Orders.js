import Card from '../UI/Card'
import { useState,useEffect } from 'react'
import classes from './HeaderCartButton.module.css';
import nclasses from '../Cart/CartItem.module.css';
import Modal from '../UI/Modal'

const Orders= props=>{
    const[allorders,setOrders]=useState([])

    useEffect(()=>{const fetchMeals=async ()=>{
        const response= await fetch('https://reactfoodapp-34f79-default-rtdb.firebaseio.com/orders.json')
        if(!response.ok){
          throw new Error('Something went wrong!')
        }
        const responseData=await response.json()
        const orders=[]

        for(const key in responseData){
            orders.push({
            id: key,
            user:responseData[key].user.name,
            orderedItems:responseData[key].orderedItems,
            orderDate:responseData[key].orderDate
          })
        }
        const orderData=[]

        setOrders(orders)
      }
      fetchMeals()
    },[])

    const orderList =allorders.map((meal) => 
    <OrderList id={meal.id} key={meal.id} user={meal.user} orderedItems={meal.orderedItems} orderDate={meal.orderDate}></OrderList>
    );

    return <Modal onClose={props.onClose}>
        <h3>All Orders..</h3>
        <ul>
            <Card>
            {orderList}
            </Card>
        </ul>
        <button className={classes.button} onClick={props.onClose}>Close</button>
    </Modal>
}
const OrderList=props=>{
    const mealList=props.orderedItems.map((meal) => 
    <MealItem id={meal.id} key={meal.id} name={meal.name} amount={meal.amount} price={meal.price}></MealItem>
    );

    return (<li>
        <div>
            <div className={nclasses.summary}>
            <span className={nclasses.price}><div>{props.user}</div></span>
            <span className={nclasses.amount}><div></div>{props.orderDate}</span>
            <ul>
            <span className={nclasses}><h3>Order Details</h3></span>
            {mealList}
            </ul>
            </div>
        </div>
    </li>);
}

const MealItem=props=>{
    return (<li>
            <div className={nclasses.summary}>
                
                <span className={nclasses}><div>{props.name}</div></span>
                <span className={nclasses.amount}><div>{props.amount}</div></span>
                <span className={nclasses.amount}><div></div>{props.price}</span>
            </div>
    </li>);
}
export default Orders