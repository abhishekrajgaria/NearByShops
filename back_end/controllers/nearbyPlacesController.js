const service = require("../service/getNearbyPlacesService");

async function getNearbyPlaces(req, res, next) {
  try {
    console.log("REQUEST", req.query);
    if (req.query.postcode) {
      const request = {
        postcode: req.query.postcode,
        keyword: req.query.type,
        radius: req.query.radius,
      };
      console.log("Request: ", request);
      const result = await service.getNearbyPlacesService(request);

      res.status(200).json(result);
    } else {
      const error = new Error(`please provide "postcode" in body`);
      error.status = 400;
      throw error;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = { getNearbyPlaces };
