import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/Registerpage/RegisterPage';
import CreateListing from './pages/CreateListing/CreateListing';
import ListingDetails from './pages/ListingDetails/ListingDetails';
import WishList from './pages/Wishlist/WishList';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import SearchPage from './pages/SearchPage/SearchPage'

function App() {
  return ( 
    <div>
     
         <Router>
            <Routes>
            <Route path="https://yatra-bbsr-backend.vercel.app" element={<Home />} />
            <Route path="https://yatra-bbsr-backend.vercel.app/register" element={<RegisterPage/>}/>
            <Route path="/login" element ={<LoginPage/>}/>
            <Route path="/create-listing" element={<CreateListing/>}/>
            <Route path="/listing/:listingId" element={<ListingDetails/>}/>
            <Route path="/:userId/wishList" element={<WishList/>}/>
            <Route path ="/listing/category/:category" element={<CategoryPage/>}/>
            <Route path ="/listing/search/:search" element={<SearchPage/>}/>
            </Routes>
          </Router>
      
    </div>
            
   
  );
}

export default App;
