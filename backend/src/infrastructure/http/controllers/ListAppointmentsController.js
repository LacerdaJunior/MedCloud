const ListAppointmentsUseCase = require("../../../application/ListAppointmentsUseCase");
const AppointmentsRepository = require("../../repositories/AppointmentsRepository");

class ListAppointmentsController {
  async handle(request, response) {
    const { id, role } = request.user;
    const appointmentsRepository = new AppointmentsRepository();

    const listAppointmentsUseCase = new ListAppointmentsUseCase(
      appointmentsRepository,
    );

    const result = await listAppointmentsUseCase.execute(id, role);

    return response.status(200).json(result);
  }
}

module.exports = ListAppointmentsController;
