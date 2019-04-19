const db = require("../dbConfig");

module.exports = {
  getAll,
  addGame
};

async function getAll() {
  return db("games");
}

async function addGame(game) {
  return db("games").insert(game);
}