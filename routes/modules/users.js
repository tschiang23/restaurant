const router = require('express').Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body

    const foundUser = await User.findOne({ email })
    if (foundUser) {
      console.log('user already exit')
      return res.render('register', { name, email, password, confirmPassword })
    }

    await User.create({ name, email, password })
    return res.render('login')
  } catch (err) {
    console.log(err)
  }
})
module.exports = router
