var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    imgHero: {
      alt:"hero",
      src:'/images/tape_low.jpg'
    }
  });
});

module.exports = router;
