const mongoose = require('mongoose')
const User = require('../user')
const db = require('../../config/mongoose')

const users = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
  },
]

db.once('open', () => {
  User.create(users)
    .then(() => {
      console.log('done')
    })
    .catch((err) => {
      console.log(err)
    })
})
