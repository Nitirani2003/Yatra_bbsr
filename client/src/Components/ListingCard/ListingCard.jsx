import React, {useState, useEffect} from 'react'
import './listingcard.scss'
import {ArrowForwardIos, ArrowBackIosNew  ,Favorite} from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWishList } from "../../redux/state";
const ListingCard = ({
    listingId, 
    creator,
    category,
    name,
    streetAddress,
    city,
    zipCode,
    operatingHours,
    listingPhotoPaths,
}) => {
  //slider for images
  const [currentIndex, setCurrentIndex] = useState(0)
  const goToPrevSlide=()=>{
    setCurrentIndex((prevIndex)=>(prevIndex-1+listingPhotoPaths.length) % listingPhotoPaths.length);
  };
  const goToNextSlide=()=>{
    setCurrentIndex((prevIndex)=>(prevIndex+1) % listingPhotoPaths.length);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* ADD TO WISHLIST */
  const user = useSelector((state) => state.user);
  const wishList = user?.wishList || [];

  const isLiked = wishList?.find((item) => item?._id === listingId);

  const patchWishList = async () => {
    if (user?._id !== creator._id) {
    const response = await fetch(
      `http://localhost:3001/users/${user?._id}/${listingId}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setWishList(data.wishList));
  } else { return }
  };
  return (
    <div className='listing-card'  onClick={() => {
      navigate(`/listing/${listingId}`);
    }}>
     <div className="slider-container">
        <div className="slider" style={{transform:`translateX(-${currentIndex*100}%)`}}>
          {listingPhotoPaths?.map((photo, index)=>(
            <div key ={index} className='slide'>
               <img 
               src={`http://localhost:3001/${photo?.replace("public", "")}`}
               alt={`photo ${index +1}`}
               />
               <div className="prev-button" onClick={(e)=>{ 
                e.stopPropagation();
                goToPrevSlide(e);
                }}
                >
                <ArrowBackIosNew style={{fontSize:"15px"}}/>
               </div>
               <div className="next-button" onClick={(e)=>{
                 e.stopPropagation();
                goToNextSlide(e);
                }}
                >
                <ArrowForwardIos style={{fontSize:"15px"}}/>
               </div>
            </div>
            ))}
        </div>
     </div>
     <h3>{name},{city}</h3>
     <p>{category}</p>
     <button
        className="favorite"
        onClick={(e) => {
          e.stopPropagation();
          patchWishList();
        }}
        disabled={!user}
      >
        {isLiked ? (
          <Favorite style={{ color: "red" }} />
        ) : (
          <Favorite style={{ color: "white" }} />
        )}
      </button>
    </div>
  );
};

export default ListingCard
