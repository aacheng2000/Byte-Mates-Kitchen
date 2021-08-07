'use strict'

const {db, models: {User, Fun, Status, Theme} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])



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



















  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
