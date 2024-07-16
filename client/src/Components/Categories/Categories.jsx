import React from 'react'
import {categories} from "../../data";
import "./categories.scss";
import {Link} from "react-router-dom";
const Categories = () => {
  return (
   <div className="categories">
    <h1>Explore Top Categories</h1>
    <p>
    Explore the best of Bhubaneswar with our comprehensive guide. Discover local restaurants, cafes, temples, parks, and more. Enjoy detailed information and create unforgettable memories in this vibrant city.
    </p>

    <div className="categories_list">
      {categories?.slice(1, 7).map((category, index)=>(
        <Link to={`/listing/category/${category.label}`}>
          <div className="category" key={index}>
            <img src={category.img} alt={category.label}/>
            <div className="overlay"></div>
            <div className="category_text">
              <div className="category_text_icon">{category.icon}</div>
              <p>{category.label}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
    </div>
  )
}

export default Categories
