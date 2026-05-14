const dayjs = require("dayjs");
const AppError = require("../errors/AppError");

class ListProviderMonthAvailabilityUseCase {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({ providerId, month, year }) {
    const appointments =
      await this.appointmentsRepository.findAllInMonthFromProvider({
        providerId,
        month,
        year,
      });

    const referenceDate = new Date(year, month - 1);
    const numberOfDaysInMonth = dayjs(referenceDate).daysInMonth();

    const eachDaysInMonth = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const availability = eachDaysInMonth.map((day) => {
      const appointmentsInThatDay = appointments.filter((appointment) => {
        const dayAppointments = dayjs(appointment.date).date();
        return dayAppointments === day;
      });

      if (appointmentsInThatDay.length >= 10) {
        return {
          day: day,
          available: false,
        };
      }

      return {
        day: day,
        available: true,
      };
    });

    return availability;
  }
}

module.exports = ListProviderMonthAvailabilityUseCase;
