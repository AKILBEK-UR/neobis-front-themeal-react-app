import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./MainPage.css";

export default function MainPage(){
    const src = "https://www.themealdb.com/api/json/v1/1/random.php";
    const [meal, setMeal] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() =>{
        axios.get(src).then((data) =>{
                console.log(data.data.meals);
                setMeal(data.data.meals[0]);
            })
    },[])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchTerm != "") {
          try {
            const response = await axios.get(
              `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
            );
            if (response.data.meals) {
              setSearchResult(response.data.meals);
            } else {
              setSearchResult([]);
              alert("Meal not founded");
              e.target.value = "";
            }
          } catch (error) {
            console.error("Error fetching meal:", error);
          }
        } else {
          alert("Type meal");
        }
    };

    return (
      <div className="mainpage" >
        <>
          <section className="mainpart">
          <Link to={`/meal/${meal.idMeal}`} key={meal.idMeal} className="mainpart">
            <div className="mainpart__title">
                <h1>{meal.strMeal}</h1>
              <div className="">
                {meal.strCategory} | {meal.strArea}
              </div>
            </div>
            <img
              className="mainpart_img"
              src={meal.strMealThumb}
              alt={meal.strMeal}
            />
          </Link>
          </section>
          <form className="search" onSubmit={handleSearch}>
            <h2>Find your Meal</h2>
            <div>
            <input
              className="search__input"
              type="text"
              placeholder="Find your meal"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search__button">
              Search
            </button>
            </div>
          </form>
        </>
        {searchResult.map((item) => (
        <section className="mainpart" key={item.idMeal}>
        <Link to={`/meal/${item.idMeal}`} key={item.idMeal} className="mainpart">
          <img
            src={item.strMealThumb}
            alt={item.strMeal}
          />
          <div className="mainpart__title">
              <h2 className="">{item.strMeal}</h2>
            <div className="">
              {item.strCategory} | {item.strArea}
            </div>
          </div>
        </Link>
        </section>
      ))}
      </div>
    )
}