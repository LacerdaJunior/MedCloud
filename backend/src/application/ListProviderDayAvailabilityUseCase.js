const dayjs = require("dayjs");
const AppError = require("../errors/AppError");

class ListProviderDayAvailabilityUseCase {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({ providerId, day, month, year }) {
    const appoitments =
      await this.appointmentsRepository.findAllInDayFromProvider({
        providerId,
        day,
        month,
        year,
      });

    if (!appoitments) {
      throw new AppError("Dados não encontrados para este usuário.", 400);
    }

    const startHour = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + startHour,
    );

    const availability = eachHourArray.map((hour) => {
      const appointmentInHour = appoitments.find((appointmment) => {
        const appointmentHour = dayjs(appointmment.date).hour();
        return appointmentHour === hour;
      });
      if (appointmentInHour) {
        return {
          hour: hour,
          available: false,
        };
      }

      return {
        hour: hour,
        available: true,
      };
    });

    return availability;
  }
}

module.exports = ListProviderDayAvailabilityUseCase;
