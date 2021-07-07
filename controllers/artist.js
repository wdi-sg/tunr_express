const model = require("../models");

const { Artist, Song } = model;

class Artists {
  static listAll(req, res) {
    return Artist.findAll().then(artists => {
      res.status(200).send(artists);
    });
  }
  static listOne(req, res) {
    console.log("listing one");
  }
  static createOne(req, res) {
    console.log("creating one");
  }
  static deleteOne(req, res) {
    console.log("delete one");
  }
  static updateOne(req, res) {
    console.log("update one");
  }
}

module.exports = Artists;
