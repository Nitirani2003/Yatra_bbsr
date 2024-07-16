import React from 'react'
import { LocationOn,LocalPhone, Email } from '@mui/icons-material'
import {MdOutlineTravelExplore} from 'react-icons/md';
import { Link } from 'react-router-dom';
import './footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer_left">
      <Link to="/" className="logo">
                <h1><MdOutlineTravelExplore className="icon" />Yatra.</h1>
          </Link>
      </div>
      <div className="footer_center">
        <h3>UseFul Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Feed Back</li>
        </ul>
      </div>
      <div className="footer_right">
       
        <h3>Contact</h3>
        <div className='footer_right_info'>
        <LocalPhone/>
        <p>+1 234 567 890</p>
        </div>
        <div className='footer_right_info'>
        <Email/>
        <p>yatra@support.com</p>
        </div>
        </div>
      
    </div>
  )
}

export default Footer
