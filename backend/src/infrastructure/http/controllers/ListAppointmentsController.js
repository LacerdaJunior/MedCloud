const ListAppointmentsUseCase = require("../../../application/ListAppointmentsUseCase");
const AppointmentsRepository = require("../../repositories/AppointmentsRepository");

class ListAppointmentsController {
  async handle(request, response) {
    const { id, role } = request.user;
    const { status } = request.query;
    const appointmentsRepository = new AppointmentsRepository();

    const listAppointmentsUseCase = new ListAppointmentsUseCase(
      appointmentsRepository,
    );

    const result = await listAppointmentsUseCase.execute({userId: id, role, status});

    return response.status(200).json(result);
  }
}

module.exports = ListAppointmentsController;
