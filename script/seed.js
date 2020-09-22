'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Jenny',
      lastName: 'Thomas',
      email: 'JThomas@email.com',
      password: '12567'
    }),
    User.create({
      firstName: 'Ben',
      lastName: 'Murphy',
      email: 'Bmurphy@email.com',
      password: 'wishesRus'
    }),
    User.create({
      firstName: 'Lacy',
      lastName: 'Mitchell',
      email: 'Lacy0090@email.com',
      password: 'helloWorld'
    }),
    User.create({
      firstName: 'Carry',
      lastName: 'Benson',
      email: 'CarryLim@email.com',
      password: 'TimeLess12294'
    }),
    User.create({
      firstName: 'Connie',
      lastName: 'Gordan',
      email: 'CGordan@email.com',
      password: 'crAshing567'
    }),
    User.create({
      firstName: 'Edward',
      lastName: 'Gonzalez',
      email: 'EGisCool@email.com',
      password: 'Ell9090'
    }),
    User.create({
      firstName: 'Sam',
      lastName: 'chan',
      email: 'ChanchanisHere@email.com',
      password: '8979goodBye'
    }),
    User.create({
      firstName: 'Tony',
      lastName: 'Curry',
      email: 'TCurry86@email.com',
      password: 'caliVibes789'
    }),
    User.create({
      firstName: 'Holly',
      lastName: 'Hanson',
      email: 'ThomasHanson@email.com',
      password: 'crud122Us'
    }),
    User.create({
      firstName: 'Barry',
      lastName: 'Smith',
      email: 'veryBarry@email.com',
      password: 'SummersinNYC123'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
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

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
