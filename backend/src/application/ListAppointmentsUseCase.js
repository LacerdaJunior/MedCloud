class ListAppointmentsUseCase {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({ userId, role, status }) {
    const appointments = await this.appointmentsRepository.findManyByUserId({
      userId,
      role,
      status,
    });

    return appointments;
  }
}

module.exports = ListAppointmentsUseCase;
