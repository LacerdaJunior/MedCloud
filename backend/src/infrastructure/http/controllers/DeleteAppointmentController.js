const DeleteAppointmentsUseCase = require("../../../application/ListAppointmentsUseCase");
const AppointmentsRepository = require("../../repositories/AppointmentsRepository");

class DeleteAppointmentController {
  async handle(request, response) {
    const { appointmentId } = request.params;
    const { id, role } = request.user;
    const appointmentsRepository = new AppointmentsRepository();

    const deleteAppointmentsUseCase = new DeleteAppointmentsUseCase(
      appointmentsRepository,
    );

    const result = await deleteAppointmentsUseCase.execute({
      appointmentId,
      userId: id,
      role,
    });

    return response.status(200).json(result);
  }
}

module.exports = DeleteAppointmentController;
