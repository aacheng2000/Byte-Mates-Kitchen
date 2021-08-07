const Sequelize = require("sequelize");
const db = require("../db");
const {
  DataTypes: { UUID, UUIDV4 },
} = Sequelize;

const Cart = db.define("cart", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
});

module.exports = Cart;
