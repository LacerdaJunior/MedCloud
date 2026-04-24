const AppError = require("../errors/AppError");

class DeleteAppointmentsUseCase {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({ appointmentId, userId, role }) {
    let deletedAppointment;

    if (role !== "admin") {
      throw new AppError(
        "Você não tem permissão para deletar a consulta.",
        403,
      );
    }

    deletedAppointment = await this.appointmentsRepository.deleteAppointment(
      appointmentId,
      userId,
    );

    const date = new Date();

    return {
      deletedAppointment,
      message: "consulta deletada com sucesso",
      date,
    };
  }
}

module.exports = DeleteAppointmentsUseCase;
