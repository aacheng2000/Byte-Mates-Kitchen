
const Sequelize = require('sequelize')
//const db = require('../db') // this is the postgres database that everyone is sharing
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bytetest');

const Fun = db.define('fun', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: Sequelize.STRING
})

const Status = db.define('status', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: Sequelize.STRING
})

const Theme = db.define('theme', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    name: Sequelize.STRING
})

const syncAndSeed = async()=> {
  await db.sync({ force: true });
  const [fun1, fun2, fun3, status1, status2, status3, theme1,theme2,theme3,theme4,theme5] = await Promise.all([
    Fun.create({ id: 1, name: 'Knives' }),
    Fun.create({ id: 2, name: 'Forks' }),
    Fun.create({ id: 3, name: 'Spoons' }),
    Status.create({ id: 1, name: 'Current' }),
    Status.create({ id: 2, name: 'Closed' }),
    Status.create({ id: 3, name: 'Wishlist' }),
    Theme.create({ id: 1, name: 'Holidays & Gifts' }),
    Theme.create({ id: 2, name: 'BBQ' }),
    Theme.create({ id: 3, name: 'Birthdays' }),
    Theme.create({ id: 4, name: 'Date Nights' }),
    Theme.create({ id: 5, name: 'Sale' }),
  ]);
};



syncAndSeed



//https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js

// Uncomment below when ready to deploy
//module.exports = {
//    Fun,
//    Status,
//    Theme,
//}

// STEP 1: create data models
// STEP 2: sync and seed
// STEP 3: create routes (use RESTFUL routes, i.e. API/fun)
// STEP 4: display the three tables in a web page 
// STEP 5: allow viewing, deleting, creating, editing (CRUD)