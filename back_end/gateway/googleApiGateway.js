const axios = require("axios");
require("dotenv").config();

async function getNearbyPlacesWithGoogleApi(location, keywordText, range) {
  try {
    const request2 = {
      method: "GET",
      url: process.env.GOOGLEAPIURL,
      params: {
        location: `${location.latitude},${location.longitude}`,
        radius: range ? range : 1000,
        keyword: keywordText ? keywordText : "store",
        key: process.env.GOOGLEAPIKEY,
      },
    };
    nearbyPlacesResponse = await axios.request(request2);
    return {
      nearby_places: nearbyPlacesResponse.data.results,
      status: nearbyPlacesResponse.data.status,
    };
  } catch (err) {
    console.log(err);
    const error = new Error("Server error");
    error.status(500);
    throw error;
  }
}

module.exports = { getNearbyPlacesWithGoogleApi };
