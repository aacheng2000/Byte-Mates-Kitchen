"use strict";

const {
  db,
  User,
  Cart,
  Order,
  Product,
  models: { Fun, Status, Theme },
} = require("../server/db");

const seedProduct = require("./seed-product-data.json");
const seedUser = require("./seed-user-data.json");
const seedFunctions = require("./seed-functions-data.json");
const seedStatus = require("./seed-status-data.json");
const seedThemes = require("./seed-themes-data.json");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('THE data: *PRODUCT* ', seedProduct, ' *USERS*', seedUser )
  
  // Creating Users
  const users = await Promise.all(seedUser.map((user) => User.create(user)));

  // Creating Products
  const products = await Promise.all(
    seedProduct.map((product) => Product.create(product))
  );

  //Creating Carts & Orders
  //const carts = await Promise.all(Cart.create());
  //const orders = await Promise.all(Order.create());

  //Creating Enumerations - Functions
  const funs = await Promise.all(seedFunctions.map((fun) => Fun.create(fun)));

  //Creating Enumerations - Status
  const statuses = await Promise.all(
    seedStatus.map((status) => Status.create(status))
  );

  //Creating Enumerations - Theme
  const themes = await Promise.all(
    seedThemes.map((theme) => Theme.create(theme))
  );
    
  console.log("db synced!");
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  return {
    users,
    products,
    //carts,
    //orders,
    funs,
    statuses,
    themes,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  console.log('THE data: *PRODUCT* ', seedProduct, ' *USERS*', seedUser )
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
