//  Todos os requires
const express = require("express");
const routes = express.Router();
const AnnotationController = require("./controllers/AnnotationController");
const ContentController = require("./controllers/ContentController");
const PriorityController = require("./controllers/PriorityController");
const UserController = require("./controllers/UserController");
const verifyUser = require("./middlewares/authMiddleware");

//Rota de anotações
routes.get("/users/:userid/notes", verifyUser, AnnotationController.read);
routes.post("/users/:userid/notes", verifyUser, AnnotationController.create);
routes.delete(
  "/users/:userid/notes/:id",
  verifyUser,
  AnnotationController.delete
);
routes.put("/users/:userid/notes/:id", verifyUser, AnnotationController.update);

//  Rota de prioridades
routes.get("/users/:userid/priorities", verifyUser, PriorityController.read);
routes.put(
  "/users/:userid/priorities/:id",
  verifyUser,
  PriorityController.update
);

routes.put("/users/:userid/contents/:id", verifyUser, ContentController.update);

//  Rota user
routes.post("/users", UserController.register);
routes.post("/users/login", UserController.login);
routes.get("/users/me", UserController.me);

module.exports = routes;
