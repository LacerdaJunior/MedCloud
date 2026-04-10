const { Router } = require("express");
const CreateUserController = require("../controllers/CreateUserController"); 

const userRoutes = Router();
const createUserController = new CreateUserController();

userRoutes.post("/", (request, response) => {
  return createUserController.handle(request, response);
});

module.exports = userRoutes;