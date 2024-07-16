import React , {useState, useEffect} from 'react'
import './search.scss'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setListings } from '../../redux/state'
import Loader from '../../Components/Loader/Loader'
import Navbar from "../../Components/Navbar/Navbar"
import ListingCard from "../../Components/ListingCard/ListingCard"
import Footer from "../../Components/Footer/Footer"

const SearchPage = () => {
    const [loading , setLoading]= useState(true)
    const {search} = useParams()
    const listings =useSelector((state)=>state.listings)
   const dispatch= useDispatch()
    const getSearchListings = async ()=>{
        try{
            const response = await fetch(`http://localhost:3001/listing/search/${search}`,{
                method: 'GET',
            }
        )
        const data =await response.json()
        dispatch(setListings({listings: data}))
        setLoading(false)
        }catch(err){
            console.log(" fetch failed", err.message)
        }
    }
    useEffect (()=>{
        getSearchListings()
        },[search])
    
    return loading? <Loader/>:(
        <>
        <Navbar/>
        <h1 className="title-list"> {search}</h1>
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

export default SearchPage