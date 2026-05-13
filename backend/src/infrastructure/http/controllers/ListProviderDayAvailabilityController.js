const ListProviderDayAvailabilityUseCase = require("../../../application/ListProviderDayAvailabilityUseCase");
const AppointmentsRepository = require("../../repositories/AppointmentsRepository");

class ListProviderDayAvailabilityController {
  async handle(request, response) {
    const { providerId } = request.params;

    const { day, month, year } = request.query;

    const appointmentsRepository = new AppointmentsRepository();

    const listProviderDayAvailabilityUseCase =
      new ListProviderDayAvailabilityUseCase(appointmentsRepository);

    const availability = await listProviderDayAvailabilityUseCase.execute({
      providerId,
      day,
      month,
      year,
    });

    return response.status(200).json(availability);
  }
}

module.exports = ListProviderDayAvailabilityController;
