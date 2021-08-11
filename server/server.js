"use strict";

const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const {
  getUsers, addUser, addGame, findUser, findGame, sendMessages,

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
  .post("/add-user", addUser)
  .get("/users/:name", findUser)



  .post("/add-game", addGame)
  .get("/games/:gameName", findGame)
  .put("/:gameName/new-message", sendMessages)




.listen(PORT, () => (console.log(`listening on port ${PORT}`)))
