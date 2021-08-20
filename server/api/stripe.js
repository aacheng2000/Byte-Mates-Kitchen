const testKey = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'
const router = require('express').Router()
const stripe = require("stripe")(testKey)
const cors = require("cors")
module.exports = router


router.post("/payment", cors(), async (req, res) => {
	let { amount, id } = req.body
	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "ByteMatesKitchen",
			payment_method: id,
			confirm: true
		})
		console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})