const express = require('express');

const nearbyShopsController = require('../controllers/nearbyShopsController');

const router = express.Router();


router.get('/nearby_shops', nearbyShopsController.getShops);


module.exports = router;