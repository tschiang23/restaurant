if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')
const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const routes = require('./routes')
const userPassport = require('./config/passport')
const flash = require('connect-flash') // 引用套件

const app = express()
const PORT = process.env.PORT

// handlebars
app.engine(
  'hbs',
  engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./config/handlebars-helpers'),
  })
)
app.set('view engine', 'hbs')

//middleware
app.use(express.static('public')) //use statie file
app.use(express.urlencoded({ extended: true })) //body-parser
app.use(methodOverride('_method')) //use methodOverride
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

userPassport(app)
app.use(flash()) // 掛載套件
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg') // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg') // 設定 warning_msg 訊息
  res.locals.error = req.flash('error') // 設定 passport error 訊息
  next()
})
app.use(routes) //use router

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
