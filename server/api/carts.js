const router = require('express').Router()
const { models: { Cart, User, Order, Status}} = require('../db')
module.exports = router

//shows all carts. need to make admin route to edit carts 
router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
        include: {Cart, User, Order, Status}
    })
    res.json(carts)
  } catch (err) {
    next(err)
  }
})

//shows the user their cart
router.get('/:id', async (req, res, next) => {
    try {
        const userCart = await Cart.findAll({
            where: {
                userId: req.params.id,
                statusId: 1
            }
        })
        res.json(userCart)
    } catch (error) {
        next(err)
    }
})