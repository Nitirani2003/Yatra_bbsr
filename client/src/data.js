

import { TbBeach, TbMountain, TbPool,TbBuildingCastle, TbBuildingHospital  } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet, FaBuildingColumns } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond, IoCafeSharp, IoLibrarySharp } from "react-icons/io5";
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets ,MdTempleHindu , MdMovie } from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
  PiPark,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: "images/H1.jpg",
    label: "Historic Sites",
    icon: <TbBuildingCastle />,
    description: "This are Historic places!",
  },
  {
    img: "images/Temple.jpg",
    label: "Religious Sites",
    icon:<MdTempleHindu />,
    description: "This property is has windmills!",
  },
  {
    img: "images/Blossom.jpg",
    label: "Park",
    icon: <PiPark />,
    description: "This property is modern!",
  },
  {
    img: "images/cafe.jpg",
    label: "Cafes",
    icon: <IoCafeSharp />,
    description: "This property is in the countryside!",
  },
  {
    img: "images/Hospital.png",
    label: "Hospitals",
    icon: <TbBuildingHospital />,
    description: "This is property has a beautiful pool!",
  },
  {
    img: "images/river.jpg",
    label: "Riverfront",
    icon: <GiIsland />,
    description: "This property is on an island!",
  },
  {
    img: "assets/lake_cat.webp",
    label: "Water Park",
    icon: <GiBoatFishing />,
    description: "This property is near a lake!",
  },
  {
    img: "assets/skiing_cat.jpg",
    label: "Restaurants",
    icon: <FaSkiing />,
    description: "This property has skiing activies!",
  },
  {
    img: "assets/castle_cat.webp",
    label: "Museum",
    icon: <FaBuildingColumns />,
    description: "This property is an ancient castle!",
  },
  {
    img: "assets/cave_cat.jpg",
    label: "Caves",
    icon: <GiCaveEntrance />,
    description: "This property is in a spooky cave!",
  },
  {
    img: "assets/camping_cat.jpg",
    label: "Camping",
    icon: <GiForestCamp />,
    description: "This property offers camping activities!",
  },
  {
    img: "assets/arctic_cat.webp",
    label: "Cinema Hall",
    icon: <MdMovie />,
    description: "This property is in arctic environment!",
  },

  {
    img: "assets/barn_cat.jpg",
    label: "Library",
    icon: <IoLibrarySharp />,
    description: "This property is in a barn!",
  },
  {
    img: "assets/lux_cat.jpg",
    label: "Mall",
    icon: <IoDiamond />,
    description: "This property is brand new and luxurious!",
  },
];

export const facilities = [
  
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Free parking",
    icon: <AiFillCar />,
  },
  {
    name: " Pet allowed",
    icon: <MdPets />
  }
];