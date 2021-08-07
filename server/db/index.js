//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/User");
const Cart = require("./models/Cart");
const Order = require("./models/Order");
const Product = require("./models/Product");
const {
  models: { Fun, Status, Theme },
} = require("./models/Enumerations");

//associations could go here!
// Fun.hasMany(Product);
// Product.belongsTo(Fun);

// Theme.hasMany(Product);
// Product.belongsTo(Theme);

// Cart.belongsTo(User);
// User.hasMany(Cart);

// Cart.hasMany(Order);
// Order.belongsTo(Cart);

// Cart.belongsTo(Status);
// Status.hasMany(Cart);

// Order.belongsTo(Product);
// Product.hasMany(Order);

module.exports = {
  db,
  User,
  Cart,
  Order,
  Product,
  models: {
    Fun,
    Status,
    Theme,
  },
};
