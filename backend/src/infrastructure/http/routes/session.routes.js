const { Router } = require("express");
const AuthenticateUserController = require("../controllers/AuthenticateController");

const sessionRoutes = Router();
const authenticateUserController = new AuthenticateUserController();

sessionRoutes.post("/", (request, response) => {
  return authenticateUserController.handle(request, response);
});

module.exports = sessionRoutes;
