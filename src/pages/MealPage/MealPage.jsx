import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./MealPage.css"

import Ingredients from "../../components/Ingredients/Ingredients";

export default function MealPage(){
    const { mealId } = useParams();
    const [meal, setMeal] = useState(null);

    useEffect(() => {
    const getMeal = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        if (response.data.meals && response.data.meals.length > 0) {
          setMeal(response.data.meals[0]);
        } else {
          setMeal(null);
        }
      } catch (error) {
        console.log("Error fetching meal details:", error.message);
      }
    };
    getMeal();
  }, [mealId]);

    return (
        <>
      {meal && (
        <div className="selected">
          <section className="selected__ingredients">
            <div className="selected__ingredients__title">
            <h1>{meal.strMeal}</h1>
              <div>
                {meal.strCategory} | {meal.strArea}
              </div>
              <Ingredients meal={meal} />
            </div>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </section>
          <section className="selected__instructions">
            <h2>Instruction</h2>
            <p>{meal.strInstructions}</p>
            <button><a href={meal.strYoutube || "#"} target="_blank"> Watch on YouTube</a></button>
          </section>
        </div>
      )}
    </>
    );
}