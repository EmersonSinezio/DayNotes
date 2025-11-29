// Required modules
const express = require("express");
const routes = express.Router();
const TaskController = require("./controllers/TaskController");
const UserController = require("./controllers/UserController");
const verifyUser = require("./middlewares/authMiddleware");

console.log("Routes loaded");

// Task Routes
routes.get("/users/:userid/notes", verifyUser, TaskController.read);
routes.post("/users/:userid/notes", verifyUser, TaskController.create);
routes.delete("/users/:userid/notes/:id", verifyUser, TaskController.delete);
routes.put("/users/:userid/contents/:id", verifyUser, TaskController.update);

// User Routes
routes.post("/users", UserController.register);
routes.post("/users/login", UserController.login);
routes.get("/users/me", UserController.me);

module.exports = routes;
