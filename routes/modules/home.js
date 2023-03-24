const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 瀏覽所有資料
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then((restaurants) => {
      return res.render('index', { restaurants })
    })
    .catch((error) => console.log(error))
})

module.exports = router
