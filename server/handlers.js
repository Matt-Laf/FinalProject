"use strict";

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const assert = require("assert");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  console.log("***** In get users");
  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");

    const users = await db.collection("users").find().toArray();

    if (users.length !== 0) {
      res
        .status(200)
        .json({ status: 200, data: users, message: "Users retrieved" });
    } else {
      res.status(404).json({ error: 404, message: "No users" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  
  client.close();
  console.log("disconnected");
};

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { name, email, password, games, maps, tokens } = req.body;

  const user = { name, email, password, games, maps, tokens };

  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");

    const newUser = await db.collection("users").insertOne(user);
    assert.strictEqual(true, newUser.acknowledged);

    res.status(200).json({
      status: 200,
      data: newUser,
      message: "Added user!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
  console.log("disconnected");
};

const findUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { name } = req.params;

  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");

    const user = await db.collection("users").findOne({ name: name});

    if (user !== undefined) {
      res.status(200).json({
        status: 200,
        data: user,
        message: `Retrieved user with name ${name}.`,
      });
    } else {
      res.status(404).json({ error: 404, message: "Item could not be found." });
    }
  } catch (err) {
    console.log(err);
    // on failure, send
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
  console.log("disconnected!");
};

const findGame = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { gameName } = req.params;

  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");

    const game = await db.collection("games").findOne({gameName:gameName});

    if (game !== undefined) {
      res.status(200).json({
        status: 200,
        data: game,
        message: `Retrieved game with name ${gameName}.`,
      });
    } else {
      res.status(404).json({ error: 404, message: "Item could not be found." });
    }
  } catch (err) {
    console.log(err);
    // on failure, send
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
  console.log("disconnected!");
};

const addGame = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { gameName, DM, players, maps, tokens } = req.body;

  const game = { gameName, DM, players, maps, tokens };

  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");

    const newGame = await db.collection("games").insertOne(game);
    assert.strictEqual(true, newGame.acknowledged);

    res.status(200).json({
      status: 200,
      data: newGame,
      message: "Added game!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }

  client.close();
  console.log("disconnected");
};

const sendMessages = async (req, res) => {
  // retrieve inventory
  // once clicked on update - inventory

  const client = new MongoClient(MONGO_URI, options);
  const { gameName } = req.params
  const { user, message } = req.body;

  const chat = { user, message };
  try {
    await client.connect();
    const db = client.db("FinalProject");
    console.log("connected");

    //find the item id in the cart collection
    const game = await db.collection("games").findOne({ gameName: gameName});
    // when found, update the cart
    if (game !== undefined) {
      const updateChat = await db
        .collection("games")
        .update(
          { gameName: gameName},
          { $push: {chat}}
          );
      assert.equal(true, updateChat.acknowledged);
    } else {
      res.status(400).json({
        error: 400,
        message: `This didn't work.`,
      });
    }

    res.status(201).json({
      status: 201,
      message: "Chat updated.",
    });
  } catch (err) {
    console.log(err);
    // on failure, send
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
}

module.exports = {
  getUsers,
  addUser,
  addGame,
  findUser,
  findGame,
  sendMessages
};
