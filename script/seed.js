'use strict'

const {db, models: {User} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', firstName: 'cody', lastName: 'snyder', email: 'snyder@gmail.com', phoneNumber: 1112223344, address: '1155 Big st.', password: '123', permission: 'admin' }),
    User.create({ username: 'murphy', firstName: 'murphy', lastName: 'duncan', email: 'duncan@gmail.com', phoneNumber: 4443332211, address: '8877 Small st.', password: '123', permission: 'user' }),
    User.create({ username: 'moe', firstName: 'moe', lastName: 'jenkins', email: 'jenkins@gmail.com', phoneNumber: 5554447799, address: '3359 Medium st.', password: '123', permission: 'guest' })
  ])

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
