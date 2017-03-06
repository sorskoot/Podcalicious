var express = require('express');
var router = express.Router();

const feedparser = require('feedparser-promised');

router.get('/', function (req, res) {
    res.send('API');
});

router.get('/feed/:url', function (req, res, next) {
    const url = 'http://www.codingblocks.net/podcast-feed.xml';

    feedparser.parse(url).then((items) => {
        
        
        res.json(items.slice(0,10));
    }).catch((error) => {
        res.sendStatus(500, error)
    });


});

module.exports = router;
