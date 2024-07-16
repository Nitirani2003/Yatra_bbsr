const router = require("express").Router()
const User = require("../models/User")
const Listing = require("../models/Listing")
    //add wishlist
router.patch("/:userId/:listingId", async(req, res) => {
    try {
        const { userId, listingId } = req.params
        const user = await User.findById(userId)
        const listing = await Listing.findById(listingId).populate("creator")
        const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId)
        if (favoriteListing) {
            user.wishList = user.wishList.filter((item) => item._id.toString() !== listingId)
            await user.save()
            res.status(200).json({ message: "Listing is removed from wishlist", wishList: user.wishList })
        } else {
            user.wishList.push(listing)
            await user.save()
            res.status(200).json({ message: "Listing is added to the wishlist", wishList: user.wishList })
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({ error: err.message })
    }
})
module.exports = router