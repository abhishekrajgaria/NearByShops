const getAddressGateway = require("../gateway/getAddressGateway");
const googleApiGateway = require("../gateway/googleApiGateway");

async function getNearbyPlacesService(request) {
  try {
    const location = await getAddressGateway.getLocation(request.postcode);
    console.log("Location", location);
    const nearbyPlaces = await googleApiGateway.getNearbyPlacesWithGoogleApi(
      location,
      request.keyword,
      request.radius
    );
    // console.log(nearbyPlaces);
    // console.log("Number of places", nearbyPlaces.nearby_places.length);
    console.log("Status of result", nearbyPlaces.status);
    if(nearbyPlaces.status !=="OK"){
        const error = new Error(nearbyPlaces.status);
        error.status = 500;
        throw error;
    }
    return nearbyPlaces;
  } catch (error) {
    throw error;
  }
}

module.exports = { getNearbyPlacesService };
