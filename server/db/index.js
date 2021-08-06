//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const { Fun, Status, Theme } = require("./models/Enumerations");

//associations could go here!
Fun.hasMany(Product);
Product.belongsTo(Fun);
Theme.hasMany(Product);
Product.belongsTo(Theme);

module.exports = {
  db,
  models: {
    User,
    Product,
    Fun,
    Status,
    Theme,
  },
};
