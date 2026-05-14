const dayjs = require("dayjs");
const AppError = require("../errors/AppError");

class ListProviderMonthAvailabilityUseCase {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({ providerId, month, year }) {
    const appointment =
      await this.appointmentsRepository.findAllInMonthFromProvider({
        providerId,
        month,
        year,
      });

    if (!appointment) {
      throw new AppError("Dados não encontrados para este usuário.", 400);
    }

    const referenceDate = new Date(year, month - 1);

    const numberOffDaysInMonth = dayjs(referenceDate).daysInMonth();

    const availableDaysInMonth = Array.from(
      { length: numberOffDaysInMonth },
      (_, index) => index + 1,
    );

    
  }
}

module.exports = ListProviderMonthAvailabilityUseCase;
