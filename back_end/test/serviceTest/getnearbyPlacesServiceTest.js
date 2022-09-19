const expect = require("chai").expect;
const sinon = require("sinon");

const getAddressGateway = require("../../gateway/getAddressGateway");
const googleApiGateway = require("../../gateway/googleApiGateway");
const service = require("../../service/getNearbyPlacesService");

describe("Service Test", function () {
    it("should be able to get nearby places", function (done) {
      const request = {
        postcode: "SW1A 2AA",
        keyword: "food",
        radius: 100
      };
      const location = { latitude: 100, longitude: 40 };
      const nearbyPlaces = { nearby_places: [{ name: "costco" }], status: "OK" };
      sinon.stub(getAddressGateway, "getLocation").resolves(location);

      sinon.stub(googleApiGateway, "getNearbyPlacesWithGoogleApi").resolves(nearbyPlaces);
      service.getNearbyPlacesService(request).then((res) => {
          console.log("Res",res);
        expect(res.status).to.equal("OK");
        done();
      });
      getAddressGateway.getLocation.restore();
      googleApiGateway.getNearbyPlacesWithGoogleApi.restore();
    });

  it("should throw error on invalid request",  function (done) {
    const request = {
      postcode: "SW1A 2AA",
      keyword: "food",
      radius: 100,
    };
    const location = { latitude: 100, longitude: 40 };
    const nearbyPlaces = { status: "INVALID_REQUEST" };
     const error = new Error(nearbyPlaces.status);
     error.status = 500;
      sinon
      .stub(getAddressGateway, "getLocation")
      .resolves(location);

    sinon
      .stub(googleApiGateway, "getNearbyPlacesWithGoogleApi")
      .resolves(nearbyPlaces);
    expect(() => {
       service.getNearbyPlacesService(request);
      done();
    }).to.throw(error);
    //  service
    //    .getNearbyPlacesService(request)
    //    .then((res) => {
    //      console.log("Res", res);
    //      expect(res).to.throw(error);
    //      done();
    //    })
    getAddressGateway.getLocation.restore();
    googleApiGateway.getNearbyPlacesWithGoogleApi.restore();
  });
});
