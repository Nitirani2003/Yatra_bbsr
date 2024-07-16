
import { categories } from '../../data'
import { useEffect, useState ,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import './listings.scss'
import React from 'react'
import ListingCard from '../ListingCard/ListingCard'
import Loader from '../Loader/Loader'
import {setListings } from "../../redux/state"

//so if we fectch it dont take time
const Listings = () => {
    const dispatch =useDispatch()
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory]= useState("All")

    const listings =useSelector((state)=>state.listings) 
    const getFeedListings=  useCallback(async ()=>{
        try {
           const response=await fetch(
            selectedCategory !=="All"?
            `http://localhost:3001/listing?category=${selectedCategory}`:"http://localhost:3001/listing",
     {
        method:"GET",

     }
    );
    const data=await response.json()
    dispatch(setListings({listings:data}));
    setLoading(false);
        }catch(err){
        console.log("Fetch Listing Failed", err.message);
        }
    },[selectedCategory, dispatch]);

    useEffect(()=>{
        getFeedListings();
        },[getFeedListings]);
       
  return (
    <>
   <div className="category-list">
    {categories?.map((category, index)=>(
        <div className={`category ${category.label === selectedCategory ? "selected" :""}`} key={index} onClick={()=>setSelectedCategory(category.label)}>
            <div className="category_icon">{category.icon}</div>
            <p>{category.label}</p>
        </div>
    ))}
   </div>
   {loading ?(<Loader/>):(
    <div className="listings">
        {listings.map((
          {_id, 
            creator,
            category,
            name,
            streetAddress,
            city,
            zipCode,
            operatingHours,
            listingPhotoPaths
            
            })=>(<ListingCard
            listingId={_id}
            creator={creator}
            category={category}
            name={name}
            streetAddress={streetAddress}
            city={city}
            zipCode={zipCode}
            operatingHours={operatingHours}
            listingPhotoPaths={listingPhotoPaths}
            />))}
        </div>


       
   )}
   </>
  )
}

export default Listings
