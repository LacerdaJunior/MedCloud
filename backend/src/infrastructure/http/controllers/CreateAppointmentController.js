const CreateAppointmentUseCase = require("../../../application/CreateAppointmentUseCase");
const AppointmentsRepository = require("../../repositories/AppointmentsRepository");

class CreateAppointmentController {
  async handle(request, response) {
    const { title, description, patientId, doctorId, date } = request.body;
    const appointmentsRepository = new AppointmentsRepository();

    const createAppointmentUseCase = new CreateAppointmentUseCase(
      appointmentsRepository,
    );
    try {
      const result = await createAppointmentUseCase.execute(title, description, patientId, doctorId, date);

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = CreateAppointmentController;
