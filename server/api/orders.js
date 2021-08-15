const router = require('express').Router()
const axios = require('axios')
const { models: { Cart, Order, Product, User}} = require('../db')
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
        const userOrders = await Order.findAll({
            include: [Cart, Product],
            where: {
                cartId: req.params.id,
            }
        })
        res.json(userOrders)
    } catch (error) {
        next(error)
    }
})

router.post('/add', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
    const stateObj = await Order.findOne({
      where: {id: newOrder.id},
      include: [Product]
    })
    res.send(stateObj)
  } catch (error) {
    next(error)
  }
})

router.delete('/delete/:id', async (req, res, next) => {
  try {
    const orderToDelete = await Order.findByPk(req.params.id)
    await orderToDelete.destroy()
    res.json(req.params.id)
  } catch (error) {
      next(error)
  }
})