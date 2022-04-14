import classes from './HeaderCartButton.module.css';

const OrderButton=props=>{
    return <button className={classes.button} onClick={props.onClick}>
        <span>Your Orders</span>
    </button>
}
export default OrderButton