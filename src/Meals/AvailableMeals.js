import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem';

const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Burger',
      description: 'Finest veggie burger..',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Omelete',
      description: 'Rohit specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Sandwitches',
      description: 'Chatpatta Allo, Creamy Egg, Eggplant Parm..',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Chat Party',
      description: 'Chatpatta chat..',
      price: 18.99,
    },
  ];
const AvailableMeals=()=>{
 const mealList =DUMMY_MEALS.map((meal) => 
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