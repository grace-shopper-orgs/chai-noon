'use strict'

const db = require('../server/db')

const {User, Product, Cart} = require('../server/db/models')

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

  const products = await Promise.all([
    Product.create({
      name: 'Earl Gray',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 1099,
      imageUrl:
        'https://img.theweek.in/content/dam/week/news/health/images/2019/3/20/tea_cancer.jpg',
      numOfItems: 10
    }),
    Product.create({
      name: 'Greenfield',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 1599,
      imageUrl:
        'https://mk0nationaltodayijln.kinstacdn.com/wp-content/uploads/2019/02/national-hot-tea-month-640x514.jpg',
      numOfItems: 10
    }),
    Product.create({
      name: 'Black tea',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 1199,
      imageUrl: 'https://www.organicfacts.net/wp-content/uploads/blacktea.jpg',
      numOfItems: 10
    }),
    Product.create({
      name: 'Chaga Tea',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 6645,
      imageUrl:
        'https://i2.wp.com/www.eatthis.com/wp-content/uploads/2019/11/chaga-mushroom.jpg?fit=1200%2C879&ssl=1',
      numOfItems: 10
    }),
    Product.create({
      name: 'Chai Tea',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 10199,
      imageUrl:
        'https://blog.piquetea.com/wp-content/uploads/2019/09/types-of-tea-white-tea.png',
      numOfItems: 10
    }),
    Product.create({
      name: 'Chamomile Tea',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 5699,
      imageUrl:
        'https://www.foodroutes.org/wp-content/uploads/2020/08/Health-Benefits-of-Different-Types-of-Tea.jpg',
      numOfItems: 10
    }),
    Product.create({
      name: 'Chrysanthemum Tea',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 1699,
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0375/8781/2485/articles/Different_Types_of_Tea_290x360_crop_top.jpg?v=1593206743',
      numOfItems: 10
    }),
    Product.create({
      name: 'Dandelion Tea',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 5099,
      imageUrl:
        'https://www.nutritionadvance.com/wp-content/uploads/2018/01/chamomile-tea.jpg',
      numOfItems: 10
    }),
    Product.create({
      name: 'Essiac Tea',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 599,
      imageUrl:
        'https://leavesthatheal.com/wp-content/uploads/2018/05/herbal-chamomile-tea-1080x675.jpeg',
      numOfItems: 10
    }),
    Product.create({
      name: 'Green Tea',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
      price: 1699,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRoqptGo6ikRtajV5JllskqaygIpR4aaUlDjw&usqp=CAU',
      numOfItems: 10
    })
  ])

  //create cart for all users

  const carts = await Promise.all([
    Cart.create({}),
    Cart.create({}),
    Cart.create({}),
    Cart.create({}),
    Cart.create({}),
    Cart.create({}),
    Cart.create({}),
    Cart.create({}),
    Cart.create({}),
    Cart.create({})
  ])

  // If we add more users, we have to add more carts as well for this to work
  for (let i = 0; i < users.length; i++) {
    // This creates a userId on cart. To access the user for a particular cart, we can do: cart.userId. To access the cart when we know the userId, when can do: cart.findOne({where: {userId = user.id}})
    await users[i].setCart(carts[i])
  }

  await carts[0].addProducts([products[3], products[4]])
  await carts[4].addProducts([products[0], products[1]])
  await carts[5].addProducts([products[4], products[5]])
  await carts[6].addProducts([
    products[1],
    products[2],
    products[6],
    products[8]
  ])

  console.log(
    `seeded ${users.length} users, ${products.length} products, and ${
      carts.length
    } carts`
  )
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
