const AppError = require("../errors/AppError");
const Appointment = require("../domain/entities/Appointment");
const dayjs = require("dayjs");
const app = require("../../app");

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

    const hoursDiff = dayjs(appointment.date).diff(dayjs(), "hours");

    if (status === "cancelled" && hoursDiff < 24) {
      throw new AppError(
        "Você não pode cancelar uma consulta em menos de 24 horas.",
        400,
      );
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
