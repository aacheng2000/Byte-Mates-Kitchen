const router = require("express").Router();
const {
    models: { User, Wishlist, Product },
} = require("../db");
module.exports = router;

//Thanks to Devin Boyd!

//shows all wishlist products
router.get('/', async(req, res, next) => {
    try {
        const allWishlists = await Wishlist.findAll({ include: [User, Product] })
        res.json(allWishlists)
    }
    catch (error) {
        next(error)
    }
})

//shows the wishlists product for specified user
router.get('/:id', async(req, res, next) => {
    try {
        const data = await User.findOne({
            where: { username: req.params.id }
        })
        const filteredWishlist = await Wishlist.findAll({
            include: [User, Product],
            where: {
                userId: data.id
            }
        })
        res.json(filteredWishlist)
    }
    catch (error) {
        next(error)
    }
})

//Delete Wishlist Item
router.delete("/delete/:id", async(req, res, next) => {
    try {
        const wishlistItem = await Wishlist.findByPk(req.params.id);
        await wishlistItem.destroy();
        res.json(req.params.id)
    }
    catch (error) {
        next(error);
    }
});

// Add Wishlist Item
router.post('/add', async(req, res, next) => {
    try {
        const newWishlist = await Wishlist.create(req.body)
        const stateObj = await Wishlist.findOne({
            where: { id: newWishlist.id },
            include: [Product]
        })
        res.send(stateObj)
    }
    catch (error) {
        next(error)
    }
})



// Create WIshlist Item
// router.post("/add", async (req, res, next) => {
//   try {
//     res.status(201).send(await Wishlist.create(req.body));
//   } catch (err) {
//     next(err);
//   }
// });