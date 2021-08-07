const router = require('express').Router()
const { models: { Cart, User, Order, Status}} = require('../db')
module.exports = router

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