const express = require('express');

const nearbyShopsController = require('../controllers/nearbyPlacesController');

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      nearbyPlaces:
 *          type: object
 *          properties:
 *              nearby_places:
 *                  type: array
 *              status:
 *                  type: string
 */

/**
 * @swagger
 * /nearby_places:
 *  get:
 *      summary: returns the list of nearby places
 *      parameters:
 *          -   in: query
 *              name: postcode
 *              required: true
 *              schema:
 *                  type: string
 *          -   in: query
 *              name: type
 *              schema:
 *                  type: string
 *          -   in: query
 *              name: radius
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: list of nearby places
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/nearbyPlaces'
 */
router.get('/nearby_places', nearbyShopsController.getNearbyPlaces);


module.exports = router;