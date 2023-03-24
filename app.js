const express = require('express')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const routes = require('./routes')
require('./config/mongoose')
const userPassport = require('./config/passport')

const app = express()
const port = 3000

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
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
)

userPassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes) //use router

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
