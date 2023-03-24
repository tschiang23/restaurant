const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const { users, restaurants } = require('./data')
const db = require('../../config/mongoose')
const User = require('../user')
const bcrypt = require('bcrypt')

db.once('open', async () => {
  await Promise.all(
    users.map(async (user, user_index) => {
      const hash = await bcrypt.hash(user.password, 10)
      user.password = hash
      const createdUser = await User.create({ ...user })
      console.log('user created')

      const userRestaurant = []
      restaurants.forEach((restaurant, rest_index) => {
        if (rest_index >= 3 * user_index && rest_index < 3 * (user_index + 1)) {
          restaurant.userId = createdUser._id
          userRestaurant.push(restaurant)
        }
      })
      await Restaurant.create(userRestaurant)
      console.log('restaurant created')
    })
  )

  console.log('done')
  process.exit()
})
