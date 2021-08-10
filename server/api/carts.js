const router = require('express').Router()
const { models: { Cart, User, Order, Status}} = require('../db')
module.exports = router

//shows all carts. need to make admin route to edit carts 
router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
        include: [User, Order, Status]
    })
    res.json(carts)
  } catch (err) {
    next(err)
  }
})

//shows the user their cart
router.get('/:id', async (req, res, next) => {
    try {
        const data = (await User.findAll({
          where: {username: req.params.id}
        }))[0].dataValues
        console.log('this is the get cart route _userid~~~~', data.id)
        const userCart = await Cart.findAll({
            where: {
                userId: data.id,
                statusId: 1
            },
            include: [Order]
        })
        res.json(userCart)
    } catch (error) {
        next(error)
    }
})