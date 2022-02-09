import { Fragment } from "react/cjs/react.production.min";
import mealsImage from '../assests/meals.jpeg';
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";

const Header = props=>{
    return <Fragment>
<header className={classes.header}>
    <h1>Rohit's Kitchen</h1>
    <HeaderCartButton onClick={props.onShowCart}/>
</header>
<div className={classes['main-image']}>
    <img src={mealsImage} alt='Yummie food!'/>
</div>
</Fragment>
};
export default Header;