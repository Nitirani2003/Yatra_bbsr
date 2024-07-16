import React ,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './RegisterPage.scss';
import Footer from "../../Components/Footer/Footer"

const RegisterPage = () => {
    const [formData, setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        profileImage:null,
    });
    const handleChange=(e)=>{
      const {name, value, files } =e.target 
      setFormData({
        ...formData,//this spread operator is important to keep the copy of the existing data
        [name]:value,
        [name]:name==="profileImage"? files[0]:value
      });
    };
    
    const [passwordMatch , setPasswordMatch]= useState(true)

    useEffect(()=>{
      setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
    })
    const navigate = useNavigate()
    //Handle Submit Button
    
    const handleSubmit = async (e)=>{
      e.preventDefault()
     
      try {
        //register form is use to send data to the body and we have photo file so we created formdata here
        const register_form = new FormData()
         //we will look through the form data 
        for(var key in formData){
         //for every key of formdata we obtain key pair value and append each key value pair to the register form and then we will send register form to the back end
          register_form.append(key, formData[key])
        }
        const response= await fetch("http://localhost:3001/auth/register",{
         method:"POST",
         body: register_form
        })
        if(response.ok){
          console.log("Registration successful:", response);
            navigate("/login")
        } else {
          console.log("Registration failed with status:", response.status);
        }
      }catch(err){
        console.log("Registration failed", err.message);
      }
    }
  return (
    
    <div className='register'>
        <div className='register_content'>
            <form className='register_content_form' onSubmit={handleSubmit}>
               <input
               placeholder='First Name'
               name='firstName'
               value={FormData.firstName}
               onChange={handleChange}
               required
               />
               <input
               placeholder='Last Name'
               name='lastName'
               value={FormData.lastName}
               onChange={handleChange}
               required
               />
               <input
               placeholder='Email'
               name='email'
               value={FormData.email}
               onChange={handleChange}
               type='email'
               required
               />
               <input
               placeholder='Password'
               name='password'
               value={FormData.password}
               onChange={handleChange}
                 type='password'
               required
               />
               <input
               placeholder='Confirm Password'
               name='confirmPassword'
               value={FormData.confirmPassword}
               onChange={handleChange}
               type='password'
               required
               />
               {!passwordMatch && (
                <p style={{color:"red"} }>Passwords doesn't match!</p>
               )}
                 <input
                 id="image"
               type="file"
               name="profileImage"   
               accept="image/*"
               style={{display:"none"}}
               onChange={handleChange}
               required
               /> 
               <label htmlFor="image">
                <img src ="/images/addImage.png" alt="add profile photo"/>
                <p>Upload Your Photo</p>
               </label>
               {formData.profileImage && (
                <img src={URL.createObjectURL(formData.profileImage)}
                //this URL can be use to display photo
                alt="profile photo"
                style={{ maxWidth:"80px"}}
                />
               )}
               <button type="submit" disabled={!passwordMatch}>REGISTER</button>
            </form>
            <a href="/login">Already have an account? Log In Here</a>
        </div>
    </div>
  );
};

export default RegisterPage;
