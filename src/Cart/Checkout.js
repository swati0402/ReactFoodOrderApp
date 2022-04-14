import classes from './Checkout.module.css';
import {useRef, useState} from 'react'

const isEmpty= value=> value.trim()===''
const isFiveChar= value=> value.trim().length === 5

const Checkout = (props) => {
  
  const nameInputref=useRef()
  const streetInputref=useRef()
  const postalInputref=useRef()
  const cityInputref=useRef()

  const [isFormValid, setFormValid]=useState(
      {name:true,
      street:true,
      city:true,
      postal:true}
  )

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName= nameInputref.current.value
    const enteredStreet= streetInputref.current.value
    const enteredPostal=postalInputref.current.value
    const enteredCity= cityInputref.current.value
    
    const validName= !isEmpty(enteredName)
    const validStreet= !isEmpty(enteredStreet)
    const validPostal= isFiveChar(enteredPostal)
    const validCity= !isEmpty(enteredCity)
    
    setFormValid({
        name:validName,
        street:validStreet,
        city:validCity,
        postal:validPostal  
    })
    const validForm= validName && validCity && validPostal && validStreet
    if(!validForm){

    }
    //Submit form data
    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        postal:enteredPostal,
        city:enteredCity
    })
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${isFormValid.name ?'' : classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputref}/>
        {!isFormValid.name && <p>Please enter valid name!</p>}
      </div>
      <div className={`${classes.control} ${isFormValid.street ?'' : classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputref}/>
        {!isFormValid.street && <p>Please enter valid street!</p>}
      </div>
      <div className={`${classes.control} ${isFormValid.postal ?'' : classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputref}/>
        {!isFormValid.postal && <p>Please enter valid postal!</p>}
      </div>
      <div className={`${classes.control} ${isFormValid.city ?'' : classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputref}/>
        {!isFormValid.city && <p>Please enter valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;