class ListProviderAppointmentsUseCase {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({ providerId, day, month, year }) {
    const appointments =
      await this.appointmentsRepository.findProviderScheduleByDay({
        providerId,
        day,
        month,
        year,
      });

    return appointments;
  }
}

module.exports = ListProviderAppointmentsUseCase;
