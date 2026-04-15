const { Router } = require("express");
const CreateUserController = require("../controllers/CreateUserController");
const ProfileController = require("../controllers/ProfileController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRoutes = Router();
const createUserController = new CreateUserController();
const profileController = new ProfileController();

userRoutes.post("/", (request, response) => {
  return createUserController.handle(request, response);
});

userRoutes.get("/profile", ensureAuthenticated, (request, response) => {
  return profileController.handle(request, response);
});

module.exports = userRoutes;
