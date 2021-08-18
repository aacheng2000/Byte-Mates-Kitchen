const Sequelize = require("sequelize");
const db = require("../db");
const Wishlist = db.define("wishlist", {
  quantity: Sequelize.INTEGER,
  productId: Sequelize.INTEGER
})
  
module.exports = Wishlist;