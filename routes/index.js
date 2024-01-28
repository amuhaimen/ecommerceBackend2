const express = require("express");
const _ = express.Router();
const apiRoutes = require("./api/index");

const api = process.env.BASE_URL; //  /api/v1
_.use(api, apiRoutes);
_.use(api, (req, res) => {
  res.send("no api found");
});

module.exports = _;
