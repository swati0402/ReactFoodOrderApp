import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals=()=>{
  const [meals, setMeals]=useState([])
  const[isLoading,setIsLoading]=useState(true)
  const[httpError,sethttpError]=useState()

  useEffect(()=>{
    const fetchMeals=async ()=>{
      const response= await fetch('https://reactfoodapp-34f79-default-rtdb.firebaseio.com/meals.json')
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const responseData=await response.json()
      const loadedMeals=[]
      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name:responseData[key].name,
          description:responseData[key].description,
          price:responseData[key].price
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }
    fetchMeals().catch(error=>{
      setIsLoading(false)
      sethttpError(error.message)
    })
  },[])

  if(isLoading && !httpError){
    return <section className={classes.Mealisloading}><p>Loading...</p></section>
  }
  if(httpError){
    return <section className={classes.Error}><p>{httpError}</p></section>
  }
 const mealList =meals.map((meal) => 
 <MealItem id={meal.id} key={meal.id} name={meal.name} price={meal.price} description={meal.description}></MealItem>
 );
 return <section className={classes.meals}>
     <ul>
         <Card>
         {mealList}
         </Card>
     </ul>
 </section>
}
export default AvailableMeals;