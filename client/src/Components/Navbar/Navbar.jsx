import React, {useState} from 'react';
import './navbar.css';
import './Navbar.scss';
import {MdOutlineTravelExplore} from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import {IconButton} from "@mui/material"
import {Search, Menu , Person } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import {setLogout} from "../../redux/state";

 const Navbar = () => {
  //for the login and sign-up drop down
  const [dropdownMenu, setDropdownMenu] = useState(false)
 const [search, setSearch]= useState("")
 const navigate = useNavigate()
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch()
  return (
            <div className="navbar">
              <Link to="/" className="logo">
                <h1><MdOutlineTravelExplore className="icon" />Yatra.</h1>
              </Link>
          
            <div className='navbar_search'>
                <input type="text" placeholder='Search.....' value={search} onChange={(e)=>setSearch(e.target.value)}/>
                <IconButton>
                  <Search style={{ color: '#F8395A' }}
                  onClick ={()=>{navigate(`/listing/search/${search}`)}}
                  />
                </IconButton>
            </div>
          <div className="navbar_right">
            {user? (
              <a href="/create-listing" className="host">Become A Host</a>
            ):(
              <a href="/login">Become A Host</a>
            )}
            <button className='navbar_right_account' onClick={()=>setDropdownMenu(!dropdownMenu)}>
              <Menu style={{color:'darkgrey'}}/>
              {!user ?(
              <Person style={{color:'darkgrey'}}/>
             ):(
             
              <img
              
               src={`http://localhost:3001/${user.profileImagePath.replace(
                "public",
                "" 
                 )}`}
                alt="profile photo" 
                style={{objectFit:"cover", borderRadius:"50%"}}
                />
             )}
            </button>
            
            {dropdownMenu && !user &&(
                 <div className="navbar_right_accountmenu">
                  <Link to="/login">Log In</Link>
                  <Link to="/register">Sign Up</Link>
                 </div>
            )}
            {dropdownMenu && user && (
              <div className='navbar_right_accountmenu'>
                <Link to={`/${user._id}/wishlist`}>Wish List</Link>
                <Link to=" ">Become A Host</Link>
                <Link to =" ">FeedBack</Link>
                <Link to =" ">About Us</Link>
                <Link to ="/login" onClick={()=>{
                  dispatch(setLogout())
                }}>Log Out</Link>

              </div>
            )}
          </div>

          </div>
       
  )
}

export default Navbar;
