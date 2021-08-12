const router = require('express').Router()
const { models: { Cart, Order, Product}} = require('../db')
module.exports = router

//shows all orders. need to make admin route to edit orders 
router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
        include: [Cart]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

//shows the user their orders
router.get('/:id', async (req, res, next) => {
    try {
        const userCart = await Order.findAll({
            include: [Cart, Product],
            where: {
                cartId: req.params.id,
            }
        })
        res.json(userCart)
    } catch (error) {
        next(error)
    }
})