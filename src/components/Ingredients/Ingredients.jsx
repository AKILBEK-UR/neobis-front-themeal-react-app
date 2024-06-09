import React from "react";
import "./Ingredients.css";
export default function Ingredients({meal}) {
    const ingredients = [];
  
  for (let i = 1; i <= 15; i++) {
    const ingredient = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }
  return (
    <ul>
      {ingredients.map((item, index) => (
        <li key={index}>
          {item.ingredient} - <b>{item.measure}</b>
        </li>
      ))}
    </ul>
  );
}