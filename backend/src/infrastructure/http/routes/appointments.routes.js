const { Router } = require("express");
const CreateAppointmentController = require("../controllers/CreateAppointmentController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureAdmin = require("../middlewares/ensureAdmin");

const appointmentsRoutes = Router();
const createAppointmentController = new CreateAppointmentController();

appointmentsRoutes.post("/", ensureAuthenticated, ensureAdmin , (request, response) => {
    
    return createAppointmentController.handle(request, response);
});  

module.exports = appointmentsRoutes;
