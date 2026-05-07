class ListAppointmentsUseCase {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({ userId, role, status, page }) {
    const limit = 10;
    const offset = (page - 1) * 10;

    const appointments = await this.appointmentsRepository.findManyByUserId({
      userId,
      role,
      status,
      limit,
      offset,
    });

    return appointments;
  }
}

module.exports = ListAppointmentsUseCase;
