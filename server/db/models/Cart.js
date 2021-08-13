const Sequelize = require("sequelize");
const db = require("../db");
const {
  DataTypes: { UUID, UUIDV4, BOOLEAN },
} = Sequelize;

const Cart = db.define("cart", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  isPending: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

module.exports = Cart;
