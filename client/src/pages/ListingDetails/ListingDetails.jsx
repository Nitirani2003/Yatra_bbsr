import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import './listingdetails.scss'
import { facilities } from "../../data";
import Loader from "../../Components/Loader/Loader"
import Navbar from "../../Components/Navbar/Navbar"

const ListingDetails = () => {
    const [loading, setLoading]= useState(true)
    const {listingId}=useParams()
    const [listing, setListing]= useState(null)

    const getListingDetails = async ()=>{
        try{
           const response= await fetch(`http://localhost:3001/listing/${listingId}`,
            {
                method:"GET",
            }
           );
           const data= await response.json();
           setListing(data)
           setLoading(false);
        }catch(err){
           console.log("FETCH Listing Details Failed", err.message);
        }
    };
    useEffect(()=>{
        getListingDetails();
    },[]);
    console.log(listing)
  return loading ? (
    <Loader />
  ) :(
    <>
    <Navbar/>
    <div className="listing-details">
        <div className="title">
            <h1>{listing.title}</h1>
        </div>

        <div className="photos">
            {listing.listingPhotoPaths?.map((item)=>(
                <img src={`http://localhost:3001/${item?.replace("public","")}`} alt="listing photo"/>
            ))}
        </div>

        <h2>
            {listing.name} , {listing.city}
        </h2>
        <p>Address :{listing.streetAddress},{listing.city}, {listing.zipCode}</p>
        <p>Operating Hours : {listing.operatingHours}</p>
        <hr />

        <div className="profile">
        {listing.creator?.profileImagePath && (
            <img 
             src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
                "public",
                ""
              )}`}
              alt={`${listing.creator.firstName} ${listing.creator.lastName}`}
            />
        )}
            <h3>
            Hosted by {listing.creator.firstName} {listing.creator.lastName}
          </h3>
        </div>
        <hr/>
        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                    </div>
                    <p>{item}</p>
                    </div>
                     ))}
                      </div>
                      </div>


       </div>
    </div>
    </>
  )
 
}
export default ListingDetails