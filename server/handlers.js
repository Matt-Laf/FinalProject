"use strict";


const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const fetch = require("node-fetch")
const assert = require("assert");
const { json } = require("body-parser");
const { request } = require("express");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options)
console.log("***** In get users")
  try {
    await client.connect()
    const db = client.db("FinalProject")
    console.log("connected")

    const users = await db.collection("users").find().toArray()

    if (users.length !== 0) {
      res.status(200).json({ status: 200, data: users, message: "Users retrieved" })
    } else {
      res.status(404).json({ error: 404, message: "No users"})
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ status: 500, data: req.body, message: err.message })
  }
  client.close()
  console.log("disconnected")
}



module.exports = {
  getUsers,
}