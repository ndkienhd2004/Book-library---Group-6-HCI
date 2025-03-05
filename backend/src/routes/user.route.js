const express = require("express");
const route = express.Router();
const UserController = require("../app/controllers/user");

route.put("/update", UserController.updateInformation);
route.get("/infor", UserController.getInformation);
route.post("/library", UserController.getLibrary);

module.exports = route;
