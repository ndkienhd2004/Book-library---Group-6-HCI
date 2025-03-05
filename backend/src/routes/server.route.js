const express = require("express");
const route = express.Router();
const ServerController = require("../app/controllers/server");

route.post("/list-book", ServerController.getListBook);

route.get("/", (req, res) => {
    res.send("Welcome to the API!");
});

module.exports = route;
