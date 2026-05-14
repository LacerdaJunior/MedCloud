const ListProviderMonthAvailabilityUseCase = require("../../../application/ListProviderMonthAvailabilityUseCase");
const AppointmentsRepository = require("../../repositories/AppointmentsRepository");

class ListProviderMonthAvailabilityController {
  async handle(request, response) {
    const { providerId } = request.params;

    const { month, year } = request.query;

    const appointmentsRepository = new AppointmentsRepository();

    const listProviderMonthAvailabilityUseCase =
      new ListProviderMonthAvailabilityUseCase(appointmentsRepository);

    const availability = await listProviderMonthAvailabilityUseCase.execute({
      providerId,
      month,
      year,
    });

    return response.status(200).json(availability);
  }
}

module.exports = ListProviderMonthAvailabilityController;
