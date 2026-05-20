const { Router } = require("express");
const CreateUserController = require("../controllers/CreateUserController");
const ProfileController = require("../controllers/ProfileController");
const UpdateProfileController = require("../controllers/UpdateProfileController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureAdmin = require("../middlewares/ensureAdmin");

const { validateUserBody } = require("../validations/CreateUserSchema");
const {
  validateUpdateProfileSchema,
} = require("../validations/UpdateProfileSchema");

const userRoutes = Router();
const createUserController = new CreateUserController();
const profileController = new ProfileController();

const updateProfileController = new UpdateProfileController();

userRoutes.post("/", validateUserBody, (request, response) => {
  return createUserController.handle(request, response);
});

userRoutes.get("/profile", ensureAuthenticated, (request, response) => {
  return profileController.handle(request, response);
});

userRoutes.patch(
  "/profile/update",
  ensureAuthenticated,
  validateUpdateProfileSchema,
  (request, response) => {
    return updateProfileController.handle(request, response);
  },
);

module.exports = userRoutes;
