const router = require('express').Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/logout', (req, res) => {
  //req.logOut() passport提供的
  req.logOut(() => {
    req.flash('success_msg', '你已經成功登出。')
    return res.redirect('/users/login')
  })
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    //註冊檢查
    const errors = []
    if (!name || !email || !password || !confirmPassword) {
      errors.push({ message: '所有欄位都是必填。' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符！' })
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
      })
    }

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
