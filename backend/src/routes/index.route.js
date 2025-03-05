const AuthRoute = require("./auth.route.js");
const UserRoute = require("./user.route.js");
const BookRoute = require("./book.route.js");
const { verifyToken } = require("../app/middlewares/auth.js");
const serverRoute = require("./server.route.js");

function route(app) {
  app.use("/auth", AuthRoute);
  app.use("/book", verifyToken, BookRoute);
  app.use("/me", verifyToken, UserRoute);
  app.use("/", serverRoute);
}

module.exports = route;
