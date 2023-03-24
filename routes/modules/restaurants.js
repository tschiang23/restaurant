const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 新增一筆資料
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const data = req.body
  const userId = req.user._id
  if (req.body.name.trim().length === 0) {
    return res.redirect('back')
  }

  return Restaurant.create({ ...data, userId })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 瀏覽一筆資料
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => {
      return res.render('detail', { restaurant })
    })
    .catch((error) => console.log(error))
})

//修改一筆資料
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => {
      return res.render('edit', { restaurant })
    })
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findById({ _id, userId })
    .then((restaurant) => {
      for (const key in req.body) {
        for (const property in restaurant) {
          if (key === property) {
            restaurant[property] = req.body[key]
          }
        }
      }

      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.log(error))
})

// 刪除一筆資料
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
