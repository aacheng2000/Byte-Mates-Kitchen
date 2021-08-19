const router = require('express').Router()

const {models: {User, Cart, Order}} = require('../db');


module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const {username, password, ordersToCreate} = req.body
    console.log(`my req.body in the backend!!!`, req.body)
    const user = await User.create({username, password})
    const newUserId = user.dataValues.id
    const newCart = (await Cart.create({userId: newUserId})).dataValues.id
    await Promise.all(ordersToCreate.product.map(id => Order.create({productId: id, cartId: newCart})))
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
});