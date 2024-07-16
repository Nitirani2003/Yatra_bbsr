const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multer = require('multer');

const User = require("../models/User");

/* Configuration Multer from file upload*/
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/uploads/") //store uploaded file in the uploads
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) //use original file name
    },

})
const upload = multer({ storage });
//user Register 
router.post("/register", upload.single('profileImage'), async(req, res) => {
    try {
        /*Take info from form*/
        const { firstName, lastName, email, password } = req.body;
        /*The uploaded file is available as req.file */
        const profileImage = req.file;
        if (!profileImage) {
            return res.status(400).send("No file uploaded");
        }
        //path to the uploaded profile photo
        const profileImagePath = profileImage.path;
        // check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already Exist!" })
        }
        //we need to hash the password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        //create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath,

        });

        //save the new user
        await newUser.save()
            //Send a successful message
        res.status(200).json({ message: "User registered Successfully", user: newUser })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registration Failed", error: err.message })

    }
});
//User Login
router.post("/login", async(req, res) => {
    try {
        // Take the information from the form
        const { email, password } = req.body

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "User doesn't exist!" });
        }
        //compare the password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        //generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        delete user.password

        res.status(200).json({ token, user })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message })
    }
})
module.exports = router;