const axios = require("axios");

exports.getShops = async (req, res, next) => {
  console.log(req.body);
  const postcode = req.body.postcode;
  console.log(postcode);
  // postcode.replace(/ /g, "").toLowerCase();
  // console.log(postcode);
  const options = {
    method: "GET",
    url:
      "https://api.getAddress.io/find/" +
      postcode +
      "?api-key=eBK94-gxfUGcDN3okrAeOw36662",
  };

  const nearbyshops = {
    method: "GET",
    url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
  };
  try {
    const response = await axios.request(options);
    // console.log(response);
    const data = response.data;
    const latitude = data.latitude;
    const longitude = data.longitude;
    console.log(latitude + "," + longitude);
    const locations = latitude + "," + longitude;
    const nearbyShopsResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: locations,
          radius: 1500,
          keyword: "shops",
          key: "AIzaSyABb4Hz-BYlwW1ULLR-1_jmiv27r8EjxG8",
        },
      }
    );
    const nearbyShopsData = nearbyShopsResponse.data;
    // console.log(nearbyShopsData);
    res.status(200).json(nearbyShopsData);
  } catch (error) {
    console.log(error);
  }
};
