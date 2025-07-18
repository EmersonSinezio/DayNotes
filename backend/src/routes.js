//  Todos os requires
const express = require("express");
const routes = express.Router();
const AnnotationController = require("./controllers/AnnotationController");
const ContentController = require("./controllers/ContentController");
const PriorityController = require("./controllers/PriorityController");
const UserController = require("./controllers/UserController");
const verifyUser = require("./middlewares/authMiddleware");

console.log("rotas carregadas");

//Rota de anotações
routes.get("/users/:userid/notes", verifyUser, AnnotationController.read);
routes.post("/users/:userid/notes", verifyUser, AnnotationController.create);
routes.delete(
  "/users/:userid/notes/:id",
  verifyUser,
  AnnotationController.delete
);
routes.put("/users/:userid/contents/:id", verifyUser, ContentController.update);

//  Rota user
routes.post("/users", UserController.register);
routes.post("/users/login", UserController.login);
routes.get("/users/me", UserController.me);

module.exports = routes;
