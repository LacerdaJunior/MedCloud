const CreateAppointmentUseCase = require("../../../application/CreateAppointmentUseCase");
const AppointmentsRepository = require("../../repositories/AppointmentsRepository");

class CreateAppointmentController {
  async handle(request, response) {
    const { title, description, patientId, doctorId, date } = request.body;
    const appointmentsRepository = new AppointmentsRepository();

    const createAppointmentUseCase = new CreateAppointmentUseCase(
      appointmentsRepository,
    );

      const result = await createAppointmentUseCase.execute(title, description, patientId, doctorId, date);

      return response.status(201).json(result);

  }
}

module.exports = CreateAppointmentController;
