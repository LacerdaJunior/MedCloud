const ListAppointmentsUseCase = require("../../../application/ListAppointmentsUseCase");
const AppointmentsRepository = require("../../repositories/AppointmentsRepository");

class ListAppointmentsController {
  async handle(request, response) {
    const {id, role} = request.user;
    const appointmentsRepository = new AppointmentsRepository();

    const listAppointmentsUseCase = new ListAppointmentsUseCase(
      appointmentsRepository,
    );
    try {
      const result = await listAppointmentsUseCase.execute(id, role);

      return response.status(200).json(result);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = ListAppointmentsController;
