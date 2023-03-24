const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

module.exports = (app) => {
  // 初始化 Passport 模組
  app.use(passport.initialize())
  app.use(passport.session())
  // 設定本地登入策略

  //passport.use(new LocalStrategy {} ,(username,password,done)=>{})
  passport.use(
    //passport 預設為username
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const foundUser = await User.findOne({ email })
          if (!foundUser) {
            return done(null, false, { message: 'Email or password incorrect' })
          }

          const isMatch = await bcrypt.compare(password, foundUser.password)

          if (!isMatch) {
            //(err,user,{message})
            return done(null, false, { message: 'Email or password incorrect' })
          }

          return done(null, foundUser)
        } catch (err) {
          console.log(err)
        }
      }
    )
  )

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then((user) => done(null, user))
      .catch((err) => done(err, null))
  })
}
