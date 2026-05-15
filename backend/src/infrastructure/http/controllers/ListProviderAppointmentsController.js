const ListProviderAppointmentsUseCase = require("../../../application/ListProviderAppointmentsUseCase");
const AppointmentsRepository = require("../../repositories/AppointmentsRepository");

class ListProviderAppointmentsController {
  async handle(request, response) {
    const { providerId } = request.params;
    const { day, month, year } = request.query;

    const appointmentsRepository = new AppointmentsRepository();
    const listProviderAppointmentsUseCase = new ListProviderAppointmentsUseCase(appointmentsRepository);

    const appointments = await listProviderAppointmentsUseCase.execute({
      providerId,
      day,
      month,
      year,
    });

    return response.status(200).json(appointments);
  }
}

module.exports = ListProviderAppointmentsController;