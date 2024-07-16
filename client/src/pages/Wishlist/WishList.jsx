import React from 'react'
import "./wishlist.scss"
import {useSelector} from "react-redux"
import Navbar from "../../Components/Navbar/Navbar"
import ListingCard from "../../Components/ListingCard/ListingCard"
import Footer from "../../Components/Footer/Footer"

const WishList = () => {
  const wishList = useSelector((state)=> state.user.wishList)
  return (
    <>
    <Navbar/>
    <h1 className="title-list">Your Wish List </h1>
    <div className="list">
      {wishList?.map(({_id,creator, listingPhotoPaths, name, city,category})=>(
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

export default WishList