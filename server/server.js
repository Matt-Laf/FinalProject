"use strict";

const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")

const {
  getUsers
} = require("./handlers")

const PORT = 8000

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/users", getUsers)


.listen(PORT, () => (console.log(`listening on port ${PORT}`)))