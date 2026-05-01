const UpdateAppointmentUseCase = require("../../../application/UpdateAppointmentUseCase");
const AppointmentsRepository = require("../../repositories/AppointmentsRepository");

class UpdateAppointmentController {
  async handle(request, response) {
    const { appointmentId } = request.params;
    const { status } = request.body;
    const appointmentsRepository = new AppointmentsRepository();

    const updateAppointmentUseCase = new UpdateAppointmentUseCase(
      appointmentsRepository,
    );

    const result = await updateAppointmentUseCase.execute({
      appointmentId,
      status
    });

    return response.status(200).json(result);
  }
}

module.exports = UpdateAppointmentController;
