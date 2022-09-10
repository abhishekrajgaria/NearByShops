const express = require('express');

const router = express.Router();


router.get('/',(req, res, next) => {
    res.send(
        '<form action="/nearby_shops" method="POST"><input type="text" name="title"><button type="submit">Enter Postcode</button></form>'
    );
});

router.post('/nearby_shops',(req, res, next) => {
    // console.log(JSON.parse(JSON.stringify(req.body)));
    console.log(req.body);
    res.send(
        '<h1>List of Nearby Shops</h1>'
    );
});

module.exports = router;