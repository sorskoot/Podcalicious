var express = require('express');
var router = express.Router();

const xml2js = require('xml2js');
const http = require('http');

router.get('/', function (req, res) {
    res.send('API');
});

router.get('/feed/:url', function (req, res, next) {
    //TODO: validate the URL;

    http.get(req.params.url, message => {
        message.setEncoding('utf8');
        let rawData = '';
        message.on('data', (chunk) => rawData += chunk);
        message.on('end', () => {
            try {
                xml2js.parseString(rawData,(err, result)=>{
                    if(err){
                        res.sendStatus(500, err);
                        return;
                    }          
                    res.json(result.rss);
                })                
            } catch (e) {
                 res.sendStatus(500, e.message);
            }
        });
    }).on('error', (e) => {
        res.sendStatus(500, e.message);
    });

})

    // feedparser.parse(req.params.url).then((items) => {        
    //     res.json(items.slice(0,10));
    // }).catch((error) => {
    //     res.sendStatus(500, error)
    // });


module.exports = router;
