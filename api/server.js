const express = require("express");
const server = express();
const helpers = require("../data/helpers");

server.use(express.json());