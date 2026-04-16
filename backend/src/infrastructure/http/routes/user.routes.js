const { Router } = require("express");
const CreateUserController = require("../controllers/CreateUserController");
const ProfileController = require("../controllers/ProfileController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureAdmin = require("../middlewares/ensureAdmin");

const userRoutes = Router();
const createUserController = new CreateUserController();
const profileController = new ProfileController();

userRoutes.post("/", (request, response) => {
  return createUserController.handle(request, response);
});

userRoutes.get("/profile", ensureAuthenticated, (request, response) => {
  return profileController.handle(request, response);
});

userRoutes.get("/test",ensureAuthenticated,ensureAdmin , (request, response) => {
  
  return response.json({message: "Acesso liberated! ow yeahs fuck yeah"})
});  

module.exports = userRoutes;
