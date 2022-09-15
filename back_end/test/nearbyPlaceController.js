const expect = require("chai").expect;
const sinon = require("sinon");
const axios = require("axios");

const nearbyPlacesController = require("../controllers/nearbyPlaces");

describe("Nearby Places Controller", function () {
  it("should throw an error if postcode is missing from request body", function () {
    const req = {
      body: {
        type: "store",
      },
    };
    nearbyPlacesController
      .getPlaces(req, {}, () => {})
      .then((result) => {
        expect(result.statusCode).to.equal(400);
      });
  });

  it("should throw an error in case of invalid postcode", function (done) {
    const req = {
      body: {
        postcode: "123",
      },
    };
    const res = {
      send: function () {},
      json: (d) => {},
      status: function (s) {
        this.statusCode = s;
        return this;
      },
    };
    const stub = sinon.stub(axios, "request").rejects({
      response: {
        data: {
          Message: "Bad Request: Invalid postcode.",
        },
      },
    });
    nearbyPlacesController
      .getPlaces(req, res, () => {})
      .then(() => {
        expect(res.statusCode).to.equal(400);
        done();
      });

    axios.request.restore();
  });
  it
    ("should successful return result of nearby places",
    function (done) {
      const req = {
        body: {
          postcode: "123",
        },
      };
      const res = {
        send: function () {},
        json: (d) => {},
        status: function (s) {
          this.statusCode = s;
          return this;
        },
      };
      sinon.stub(axios, "request").resolves({data:{
        status: "OK",
        results: [],
        next_page_token: ""
      }});
      nearbyPlacesController
        .getPlaces(req, res, () => {})
        .then(() => {
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
});
