const express = require("express");
const server = express();
const helpers = require("../data/helpers");

server.use(express.json());

// GET /games
server.get("/games", async (req, res) => {
    const games = await helpers.getAll();
    res.status(200).json({ games });
});

// POST /games
server.post("/games", async (req, res) => {
    const newGame = req.body.game;
    if (newGame.title && newGame.genre) {
        const game = await helpers.addGame(newGame);
        res.status(201).json({ game });
    } else {
        res.status(422).json({ error: "Please, check your games informations." });
    }
});

module.exports = server;
