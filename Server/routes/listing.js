const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const Listing = require("../models/Listing");
const User = require("../models/User");
/* Configuration Multer from file upload*/
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads/") //store uploaded file in the uploads
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) //use original file name
    },

});
const upload = multer({ storage });

//Create Listing
router.post("/create", upload.array("listingPhotos"), async(req, res) => {
    try {
        //take the information from the form
        const {
            creator,
            category,
            name,
            streetAddress,
            city,
            zipCode,
            operatingHours,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
        } = req.body;

        const listingPhotos = req.files
        if (!listingPhotos) {
            return res.status(400).send("No file uploaded.")
        }
        const listingPhotoPaths = listingPhotos.map((file) => file.path)
        const newlisting = new Listing({
            creator,
            category,
            name,
            streetAddress,
            city,
            zipCode,
            operatingHours,
            amenities,
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDesc,

        })

        await newlisting.save()
        res.status(200).json(newlisting)
    } catch (err) {
        res.status(409).json({ message: "Fail to create Listing", error: err.message })
        console.log(err);
    }
});

//Get listing by categories
router.get("/", async(req, res) => {
    const qCategory = req.query.category
    try {
        //listing belong to diff category so filter is there
        let listings
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate("creator")
        } else {
            listings = await Listing.find().populate("creator")

        }
        res.status(200).json(listings)
    } catch (err) {
        res.status(409).json({ message: "Fail to fetch the Listing", error: err.message })
        console.log(err);
    }
});

//get isting by search
router.get("/search/:search", async(req, res) => {
    const { search } = req.params
    try {
        let listings = []
        if (search === "all") {
            listings = await Listing.find().populate("creator")

        } else {
            listings = await Listing.find({
                $or: [{
                        category: { $regex: search, $options: "i" }
                    },

                    {
                        title: { $regex: search, $options: "i" }
                    },
                ]
            }).populate("creator")
        }
        res.status(200).json(listings)
    } catch (err) {
        res.status(404).json({ message: "listing can not found!", error: err.message })
        console.log(err)
    }
})

//Listing Details
router.get("/:listingId", async(req, res) => {
    try {
        const { listingId } = req.params
        const listing = await Listing.findById(listingId)
        res.status(202).json(listing)
    } catch (err) {
        res.status(404).json({ message: "Listing can not found!", error: err.message })
    }
})
module.exports = router;