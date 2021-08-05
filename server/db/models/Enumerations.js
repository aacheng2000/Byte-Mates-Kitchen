const Sequelize = require('sequelize')
const db = require('../db')

const Fun = db.define('fun', {
    id: Sequelize.Number,
    name: Sequelize.Name
})

const Status = db.define('status', {
    id: Sequelize.Number,
    name: Sequelize.Name
})

const Theme = db.define('theme', {
    id: Sequelize.Number,
    name: Sequelize.Name
})

//https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js
module.exports = {
    Fun,
    Status,
    Theme,
}

// STEP 1: create data models
// STEP 2: sync and seed
// STEP 3: create routes (use RESTFUL routes, i.e. API/fun)
// STEP 4: display the three tables in a web page 
// STEP 5: allow viewing, deleting, creating, editing (CRUD)