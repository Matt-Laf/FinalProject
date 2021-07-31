const { default: fetch } = require("node-fetch");

fetch("https://www.dnd5eapi.co/api/")
  .then(res => res.json())
  .then(data => console.log(data))