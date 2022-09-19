const expect = require("chai").expect;
const sinon = require("sinon");

const service = require("../../service/getNearbyPlacesService");
const controller = require("../../controllers/nearbyPlacesController");

describe("Nearby Places Controller Test", function () {
  it("should be able to provide successful response", function (done) {
    const request = {body:{
      postcode: "SW1A 2AA",
      type: "food",
      radius: 100,
    }};
    const res = {
      send: function () {},
      json: (d) => {},
      status: function (s) {
        this.statusCode = s;
        return this;
      },
    };
    const response = {
        nearby_places : [],
        status: "OK"
    }
    sinon.stub(service,"getNearbyPlacesService").resolves(response);
    controller.getNearbyPlaces(request,res,()=>{}).then(()=>{
        expect(res.statusCode).to.equal(200);
        done();
    })
    service.getNearbyPlacesService.restore();
  });
});
