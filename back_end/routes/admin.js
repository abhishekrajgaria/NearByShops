const express = require('express');

const nearbyShopsController = require('../controllers/nearbyPlaces');

const router = express.Router();


router.get('/nearby_shops', nearbyShopsController.getPlaces);


module.exports = router;