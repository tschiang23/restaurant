const router = require('express').Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/logout', (req, res) => {
  //req.logOut() passport提供的
  req.logOut(() => res.redirect('/users/login'))
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

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
