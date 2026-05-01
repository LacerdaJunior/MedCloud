const { Router } = require("express");
const CreateAppointmentController = require("../controllers/CreateAppointmentController");
const ListAppointmentsController = require("../controllers/ListAppointmentsController");
const DeleteAppointmentController = require("../controllers/DeleteAppointmentController");
const UpdateAppointmentController = require("../controllers/UpdateAppointmentController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureAdmin = require("../middlewares/ensureAdmin");

const {
  validateAppointmentBody,
} = require("../validations/CreateAppointmentSchema");

const appointmentsRoutes = Router();

const createAppointmentController = new CreateAppointmentController();
const listAppointmentsController = new ListAppointmentsController();
const deleteAppointmentController = new DeleteAppointmentController();
const updateAppointmentController = new UpdateAppointmentController();

appointmentsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  validateAppointmentBody,
  (request, response) => {
    return createAppointmentController.handle(request, response);
  },
);

appointmentsRoutes.get("/", ensureAuthenticated, (request, response) => {
  return listAppointmentsController.handle(request, response);
});

appointmentsRoutes.delete(
  "/:appointmentId",
  ensureAuthenticated,
  ensureAdmin,
  (request, response) => deleteAppointmentController.handle(request, response),
);

appointmentsRoutes.patch(
  "/:appointmentId/status",
  ensureAuthenticated,
  ensureAdmin,
  updateAppointmentController.handle,
);

module.exports = appointmentsRoutes;
