const express = require('express')
const { engine } = require('express-handlebars')
const { create } = require('express-handlebars')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

app.use(express.static('public')) //use statie file
app.use(express.urlencoded({ extended: true })) //body-parser
app.use(methodOverride('_method')) //use methodOverride
app.use(routes) //use router

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
