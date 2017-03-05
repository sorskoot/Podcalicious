var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', {
    title: 'podcalicious',
    imgHero: {
      alt:"hero",
      src:'/images/header.jpg'
    }
  });
});

module.exports = router;
