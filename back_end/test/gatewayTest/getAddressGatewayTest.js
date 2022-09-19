const expect = require("chai").expect;
const sinon = require("sinon");
const axios = require("axios");

const getAddressGateway = require("../../gateway/getAddressGateway");

describe("Get Address Gateway Test", function () {
  it("should return lat and long with proper postcode", function (done) {
    const response = {
      data: {
        latitude: 100,
        longitude: 30,
      },
    };
    sinon.stub(axios, "request").resolves(response);
    getAddressGateway.getLocation("SW1A 2AA").then((res) => {
      expect(res.latitude).to.equal(response.data.latitude);
      done();
    });
    axios.request.restore();
  });

  it("should throw error for invalid postcode", function (done) {
    const error = {
      response: {
        data: {
          Message: " Bad Request, invalid postcode",
        },
        status: 400,
      },
    };
    sinon.stub(axios, "request").rejects(error);
    expect(() => {
      getAddressGateway.getLocation("123");
      done();
    }).to.throw(error);
    axios.request.restore();
  });

  after(() => {
    axios.request.restore();
  });
});
