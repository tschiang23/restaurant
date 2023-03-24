const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 查詢資料
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  const sortInfo = req.query.sortInfo
  const sortInfoArray = sortInfo.split('-')
  const sortObject = {}
  sortInfoArray[1]
    ? (sortObject[sortInfoArray[0]] = sortInfoArray[1])
    : sortObject

  const keywordRegex = new RegExp(keyword, 'i')

  Restaurant.find({
    $or: [
      { name: { $regex: keywordRegex } },
      { category: { $regex: keywordRegex } },
    ],
  })
    .lean()
    .sort(sortObject)
    .then((restaurants) => {
      return res.render('index', { restaurants, keyword, sortInfo })
    })
    .catch((error) => console.log(error))
})

module.exports = router
