const { Router } = require("express");
const CreateAppointmentController = require("../controllers/CreateAppointmentController");
const ListAppointmentsController = require("../controllers/ListAppointmentsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const ensureAdmin = require("../middlewares/ensureAdmin");

const appointmentsRoutes = Router();
const createAppointmentController = new CreateAppointmentController();
const listAppointmentsController = new ListAppointmentsController();

appointmentsRoutes.post("/", ensureAuthenticated, ensureAdmin , (request, response) => {
    
    return createAppointmentController.handle(request, response);
});  
appointmentsRoutes.get("/", ensureAuthenticated, (request, response) => {
    
    return listAppointmentsController.handle(request, response);
});  


module.exports = appointmentsRoutes;
