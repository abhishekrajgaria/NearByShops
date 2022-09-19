const axios = require("axios");
require("dotenv").config();

async function getLocation(postcode) {
  try {
    const request1 = {
      method: "GET",
      url: `${process.env.GETADDRESSURL}/${postcode}`,

      params: {
        "api-key": process.env.GETADDRESSAPIKEY,
      },
    };

    const response = await axios.request(request1);
    const data = response.data;
    const location = {
      latitude: data.latitude,
      longitude: data.longitude,
    };
    return location;
  } catch (err) {
    console.log(err);
    const error = new Error(err.response.data.Message);
    error.status = (err.response.status);
    throw error;
  }
}

module.exports = { getLocation };
