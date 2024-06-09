import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header(){
    return (
        <header>
            <Link to="/">The Meal</Link>
        </header>
    );
}