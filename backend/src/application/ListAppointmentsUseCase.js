
class ListAppointmentsUseCase {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute(userId, role) {
    const appointments = await this.appointmentsRepository.findManyByUserId(
      userId,
      role,
    );

    return appointments;
  }
}

module.exports = ListAppointmentsUseCase;
