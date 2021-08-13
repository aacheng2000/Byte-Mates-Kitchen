const Sequelize = require("sequelize");
const db = require('../db') // this is the postgres database that everyone is sharing
// const db = new Sequelize(
//   process.env.DATABASE_URL || "postgres://localhost/bytetest"
// );

const Fun = db.define("fun", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: Sequelize.STRING,
});

const Theme = db.define("theme", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: Sequelize.STRING,
});

//https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js

module.exports = {
  models: {
    Fun,
    Theme
  },
};
