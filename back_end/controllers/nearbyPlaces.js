// const axios = require("axios");
// require("dotenv").config();

// const getLocation = async function (postcode) {
//   const options = {
//     method: "GET",
//     url:
//       process.env.GETADDRESSURL +
//       postcode +
//       "?api-key="+process.env.GETADDRESSAPIKEY,
//   };
//   try {
//     const response = await axios.request(options);
//     if (response.status === 200) {
//       const data = response.data;
//       const location = data.latitude + "," + data.longitude;
//       return location;
//     }
//   } catch (err) {
//     // console.error(err);
//     throw err.response.data;
//   }
// };

// const getNearbyPlaces = async function (locations, placeType, placeWithInRadius) {
//   let next_page_token;
//   const nearbyPlaces = {
//     method: "GET",
//     url: process.env.GOOGLEAPIURL,
//     params: {
//       location: locations,
//       radius: placeWithInRadius ? placeWithInRadius : 1000,
//       keyword: placeType ? placeType : "store",
//       key: process.env.GOOGLEAPIKEY,
//       pagetoken: next_page_token,
//     },
//   };
//   let nearbyPlacesResponse;
//   try {
//     nearbyPlacesResponse = await axios.request(nearbyPlaces);
//     return {
//       next_page_token: nearbyPlacesResponse.data.next_page_token
//         ? nearbyPlacesResponse.data.next_page_token
//         : "",
//       nearby_places: nearbyPlacesResponse.data.results,
//       status: nearbyPlacesResponse.data.status,
//     };
//   } catch (err) {
//     throw err.response.data;
//   }
// };

// exports.getPlaces = async (req, res) => {
//   try {
//     if (req.body.postcode) {
//       const postcode = req.body.postcode;
//       const placeType = req.body.type;
//       const radius = req.body.radius;
//       const location = await getLocation(postcode);
//       const nearbyPlaces = await getNearbyPlaces(location, placeType, radius);
//       res.status(200).json(nearbyPlaces);
//     } else {
//       throw `please provide "postcode" in body`;
//     }
//   } catch (err) {
//     // console.error(err);
//     res.status(400).json({
//       error_message: err,
//     });
//   }
// };
