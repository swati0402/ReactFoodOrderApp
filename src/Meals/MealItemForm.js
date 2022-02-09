import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";
import { useRef ,useState} from "react";

const MealItemForm = props =>{
    const[amountIsvalid,setAmountIsValid]=useState(true);

    const amountInputRef= useRef();

    const submitHandler= event =>{
        event.preventDefault()
        const enteredAmount= amountInputRef.current.value;
        const enteredAMountNumber= + enteredAmount
        if(enteredAmount.trim().lenght === 0 || enteredAMountNumber <1){
            setAmountIsValid(false);
            return;
        }
        props.onAddtoCart(enteredAMountNumber)
    };
return <form className={classes.form} onSubmit={submitHandler}>
    <Input 
    label='Amount'
    ref={amountInputRef}
    input={
        {
            id:'amount_' + props.id, 
            type:'number',
            min:'1',
            max:'5',
            step:'1',
            defaultValue:'1'
        }
    }></Input>
    <button>+ Add</button>
    {!amountIsvalid && <p>Please enter a valid amount</p>}
</form>
}
export default MealItemForm