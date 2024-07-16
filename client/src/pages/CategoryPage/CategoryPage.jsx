import React, {useState, useEffect} from 'react'
import { useCallback } from 'react';

import './page.scss'
import Navbar from "../../Components/Navbar/Navbar"
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setListings } from '../../redux/state'
import Loader from '../../Components/Loader/Loader'
import ListingCard from '../../Components/ListingCard/ListingCard'
import Footer from "../../Components/Footer/Footer"

const CategoryPage = () => {
    const [loading, setLoading] = useState(true)
    const {category } =useParams()
     const dispatch= useDispatch()
   
     const listings =useSelector((state)=>state.listings) 
    const getFeedListings=  useCallback(async ()=>{
        try {
           const response=await fetch(
           
            `http://localhost:3001/listing?category=${category}`,
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
    },[category, dispatch]);

    useEffect(()=>{
        getFeedListings();
        },[getFeedListings]);  
    
  return  loading? (
  <Loader/>
 ): (
    <>
    <Navbar/>
    <h1 className="title-list">{category} listings </h1>
    <div className="list">
      {listings?.map(({_id,creator, listingPhotoPaths, name, city,category})=>(
        <ListingCard 
        listingId={_id}
        creator={creator}
        listingPhotoPaths={listingPhotoPaths}
        name={name}
        city={city}
        category={category}
        />))}
    </div>
    <Footer/>
    </>
  )
}

export default CategoryPage