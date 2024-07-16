import React , {useState} from 'react'
import './CreateListing.scss';
import Navbar from '../../Components/Navbar/Navbar'
import {categories, facilities} from "../../data"
import { DragDropContext, Draggable, Droppable} from "react-beautiful-dnd"
import{IoIosImages} from "react-icons/io"
import { BiTrash } from 'react-icons/bi'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Components/Footer/Footer"

const CreateListing = () => {
//Location 
const [formLocation , setFormLocation]=useState({
  name:"",
  streetAddress:"",
  city:"",
  zipCode:"",
  operatingHours:"",
})
const handleChangeLocation= (e)=>{
  const {name, value}=e.target
  setFormLocation({
    ...formLocation,
    [name]:value
  })
}
//facilities
const [amenities, setAmenities]= useState([]);
const handleSelectAmenities=(facility)=>{
  if(amenities.includes(facility)){
    setAmenities((prevAmenities)=>prevAmenities.filter((option)=>option!==facility))
  }else{
    setAmenities((prev)=>[...prev, facility])
  }
}

//category
const [category, setCategory] = useState("");

//upload drag and drop photos
const [photos, setPhotos]=useState([])
const handleUploadPhotos=(e)=>{
    const newPhotos=e.target.files;
    setPhotos((prevPhotos)=>[...prevPhotos, ...newPhotos]);
};

const handleDragPhoto = (result)=>{
    if(!result.destination) return;
    const items =Array.from(photos);
    const [reorderedItem]= items.splice(result.source.index, 1);
    items.slice(result.destination.index, 0 , reorderedItem);
    setPhotos(items);
};
const handleRemovePhoto=(indexToRemove)=>{
    setPhotos((prevPhotos)=>
    prevPhotos.filter((_, index)=>index!==indexToRemove)
  );
};
//Description
const [formDescription, setFormDescription]=useState({
  title: "",
  description: "",
  highlight: "",
  highlightDesc: "",

});
const handleChangeDescription=(e)=>{
  const {name, value}=e.target;
  setFormDescription({
    ...formDescription,
    [name]:value,
  });
};

const creatorId= useSelector((state)=>state.user._id);
const navigate= useNavigate();
const handlePost= async (e)=>{
  e.preventDefault();

  try{
 //create a new formdata onject to handle file uploads
 const listingForm =new FormData();
 listingForm.append("creator", creatorId);
 listingForm.append("category", category);
 listingForm.append("name", formLocation.name);
 listingForm.append("streetAddress", formLocation.streetAddress);
 listingForm.append("city", formLocation.city);
 listingForm.append("zipCode", formLocation.zipCode);
 listingForm.append("amenities", amenities);
 listingForm.append("operatingHours" ,formLocation.operatingHours);
 listingForm.append("title",formDescription.title);
 listingForm.append("description",formDescription.description);
 listingForm.append("highlight",formDescription.highlight);
listingForm.append("highlightDesc", formDescription.highlightDesc);
//Append each selected photos to the formData object
photos.forEach((photo)=>{
  listingForm.append("listingPhotos", photo)
})

//send a post reques to server
const response =await fetch("http://localhost:3001/listing/create", {
  method:"POST",
  body:listingForm,
})
if(response.ok){
navigate("/")
}
  }catch(err){
console.log("Publish Listing failed",err.message)
  }
}
  return (
   <>
   <Navbar/>

   <div className="create-listing">
    <h1>Publish Your Place</h1>
    <form onSubmit={handlePost}>
        <div className="create-listing_step1">
            <h2 >Step 1: Tell us about your place</h2>
            <hr/>
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
                {categories?.map((item, index)=>(
                   <div className={ `category ${category === item.label ? "selected":""}`} key={index} onClick={()=>setCategory(item.label)}>
                    <div className="category_icon">{item.icon}</div>
                    <p>{item.label}</p>
                   </div> 
                ))}
            </div>

            <h3>Information About your place</h3>
            <div className="full">
                <div className='location'>
                <p>Name of your place</p>
                <input 
                type="text" 
                name="name" 
                placeholder="Name of the place" 
                value={formLocation.name}
                onChange={handleChangeLocation}
                required 
                />
            </div>
            </div>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>
            <div className="half">
                <div className="location">
                <p>City</p>
                <input type="text" 
                name="city" 
                placeholder="City" 
                value={formLocation.city}
                onChange={handleChangeLocation}
                required 
                />
                </div>
                <div className="location">
                <p>ZipCode</p>
                <input type="text" 
                name="zipCode" 
                placeholder="Zip Code" 
                value={formLocation.zipCode}
                onChange={handleChangeLocation}
                required 
                />
                </div>
            </div>
            <div className="full">
                <div className="location">
                    <p>Operating Hour</p>
                    <input 
                    type="text" 
                    name="operatingHours" 
                    placeholder="Operating Hours (e.g., 9 AM - 9 PM)" 
                    value={formLocation.operatingHours}
                    onChange={handleChangeLocation}
                     />
                </div>
            </div>
            <div className="create-listing_step2">
                <h2>Step 2: Make your place stand out</h2>
                <hr/>

                <h3>Tell guests what your place has to offer</h3>
                <div className="amenities">
                    {facilities?.map((item, index)=>(
                        <div className={`facility ${amenities.includes(item.name)?"selected":""}`} key={index} onClick={()=>handleSelectAmenities(item.name)}>
                            <div className="facility_icon">
                                {item.icon}
                            </div>
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            
                <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div 
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                            <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                            />
                             <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                        </>
                       )}
                       {photos.length >=1 && (
                        <>
                       {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                                >
                                    {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                           <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <h3>What make your place attractive and exciting?</h3>
            <div className="description">
                <p>Title</p>
                <input 
                type="text" 
                placeholder='Title' 
                name="title" 
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
                />
                <p>Description</p>
                <input 
                type="text" 
                placeholder='Description' 
                name="description" 
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
                />
                <p>Highlight</p>
                <input 
                type="text" 
                placeholder='Highlight' 
                name="highlight" 
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
                />
                <p>Highlight Details</p>
                <textarea 
                type="text" 
                placeholder='Highlight details' 
                name="highlightDesc" 
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
                />
            </div>
            </div>
        </div>
        <button className='submit_btn' type="submit">Create Your Listing</button>
    </form>
   </div>
   <Footer/>
   </>
  );
};

export default CreateListing
