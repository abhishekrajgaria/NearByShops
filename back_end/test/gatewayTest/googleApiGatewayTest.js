const expect = require("chai").expect;
const sinon = require("sinon");
const axios = require("axios");

const googleApiGateway = require("../../gateway/googleApiGateway");

describe("Google Api Gateway Test", function () {
  it("should return nearby places result", function (done) {
    const response1 = {
      data: {
        results: [],
        status: "OK",
      },
      status: 200,
    };
    sinon.stub(axios, "request").resolves(response1);
    googleApiGateway
      .getNearbyPlacesWithGoogleApi({
        latitude: 100,
        longitude: 80,
      })
      .then((res) => {
        expect(res.status).to.equal("OK");
        done();
      });
    axios.request.restore();
  });

  it("should throw an error with invalid request", function (done) {
    const error = {
      response: {
        data: {
          Message: " Bad Request",
        },
        status: 400,
      },
    };
    sinon.stub(axios, "request").rejects(error);

    expect(()=>{
        googleApiGateway.getNearbyPlacesWithGoogleApi({
      latitude: 100,
      longitude: 80,
    });
    done();}).to.throw(error);
    axios.request.restore();
  });
  
  after(() => {
    axios.request.restore();
  });
});
