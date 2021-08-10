"use strict";

const {
  db,
  models: { Fun, Status, Theme, User, Product, Cart, Order },
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

  // Creating Users
  const [cody, murphy, moe] = await Promise.all(
    seedUser.map((user) => User.create(user))
  );
  const users = [cody, murphy, moe];

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

  // Creating Products
  const products = await Promise.all(
    seedProduct.map((product) => Product.create(product))
  );
  //creates product and order associations
  cart1.statusId = 1;
  cart2.statusId = 2;

  //saves created associations to db
  // await Promise.all([cart1.save(), cart2.save(), order1.save(), order2.save()]);
  // const carts = [cart1, cart2];
  // const orders = [order1, order2];

  //Creating Carts & Orders
  const [cart1, cart2] = await Promise.all([Cart.create({}), Cart.create({})]);
  const [order1, order2] = await Promise.all([
    Order.create({}),
    Order.create({}),
  ]);

  //creates cart and order associations
  cart1.userId = cody.id;
  cart1.statusId = 1;
  cart2.userId = murphy.id;
  cart2.statusId = 2;
  order1.cartId = cart1.id;
  order1.productId = 1;
  order2.cartId = cart2.id;
  order2.productId = 2;

  //saves created associations to db
  await Promise.all([cart1.save(), cart2.save(), order1.save(), order2.save()]);
  const carts = [cart1, cart2];
  const orders = [order1, order2];

  console.log("db synced!");
  console.log(`seeded ${products.length} products`);
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  return {
    users,
    products,
    carts,
    orders,
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
  console.log("THE data: *PRODUCT* ", seedProduct, " *USERS*", seedUser);
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
