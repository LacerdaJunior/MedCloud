const AppError = require("../errors/AppError");
const Appointment = require("../domain/entities/Appointment");

class UpdateAppointmentUseCase {
  constructor(appointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  async execute({ appointmentId, status }) {
    const appointment =
      await this.appointmentsRepository.findByAppointmentId(appointmentId);

    if (!appointment) {
      throw new AppError("Consulta não encontrada.", 404);
    }
    if (!Appointment.validStatuses.includes(status)) {
      throw new AppError("Status inválido.", 400);
    }

    if (
      appointment.status === "finished" ||
      appointment.status === "cancelled"
    ) {
      throw new AppError(
        "Você não pode alterar o status de uma consulta já finalizada/cancelada.",
        400,
      );
    }

    await this.appointmentsRepository.updateAppointment(status, appointmentId);

    return {
      message: "Consulta atualizada com sucesso",
      novoStatus: status,
      dataAlteracao: new Date(),
    };
  }
}

module.exports = UpdateAppointmentUseCase;
