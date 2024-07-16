
import Navbar from "../../Components/Navbar/Navbar"
import Slide from "../../Components/Slide/Slide"
import Categories from "../../Components/Categories/Categories"
import Listings from "../../Components/Listings/Listings"
import Footer from "../../Components/Footer/Footer"
//import {Navbar} from '../../Components/Navbar/Navbar';
const Home = () => {
  return (
    <>
     <Navbar />
     <Slide/>
     <Categories/>
     <Listings/>
     <Footer/>
    </>
  )
}

export default Home
