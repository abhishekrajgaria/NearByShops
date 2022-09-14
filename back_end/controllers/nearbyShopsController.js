const axios = require("axios");

const getLocation = async function (postcode) {
  const options = {
    method: "GET",
    url:
      "https://api.getAddress.io/find/" +
      postcode +
      "?api-key=eBK94-gxfUGcDN3okrAeOw36662",
  };
  try {
    const response = await axios.request(options);
    if (response.status === 200) {
      const data = response.data;
      const location = data.latitude + "," + data.longitude;
      return location;
    }
  } catch (err) {
    throw err.response.data;
  }
};

const getPlaces = async function (locations, placeType, placeWithInRadius) {
  let next_page_token;
  const nearbyPlaces = {
    method: "GET",
    url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
    params: {
      location: locations,
      radius: placeWithInRadius ? placeWithInRadius : 1000,
      keyword: placeType ? placeType : "store",
      key: "AIzaSyABb4Hz-BYlwW1ULLR-1_jmiv27r8EjxG8",
      pagetoken: next_page_token,
    },
  };
  let nearbyPlacesResponse;
  try {
    nearbyPlacesResponse = await axios.request(nearbyPlaces);
    return {
      next_page_token: nearbyPlacesResponse.data.next_page_token
        ? nearbyPlacesResponse.data.next_page_token
        : "",
      nearby_places: nearbyPlacesResponse.data.results,
      status: nearbyPlacesResponse.data.status,
    };
  } catch (err) {
    throw err.response.data;
  }
};

exports.getShops = async (req, res, next) => {
  try {
    if (req.body.postcode) {
      const postcode = req.body.postcode;
      const placeType = req.body.type;
      const radius = req.body.radius
      console.log(postcode);

      const location = await getLocation(postcode);
      console.log("Location", location);
      const nearbyPlaces = await getPlaces(location, placeType, radius);
      res.status(200).json(nearbyPlaces);
    }
    else{
        throw `please provide "postcode" in body`;
    }
  } catch (err) {
    res.status(400).json({
      "error_message": err,
    });
  }
};
