const Appointment = require("../domain/entities/Appointment");
const User = require("../domain/entities/User");

class CreateAppointmentUseCase {
  constructor(AppointmentsRepository) {
    this.appointmentsRepository = AppointmentsRepository;
  }

  async execute(title, description, patientId, doctorId, date) {
    const appointment = new Appointment({
      title,
      description,
      patientId,
      doctorId,
      date,
    });

    await this.appointmentsRepository.save(appointment);

    return {
      id: appointment.id,
      title: appointment.title,
      description: appointment.description,
      doctorId: appointment.doctorId,
      patientId: appointment.patientId,
      date: appointment.date,
      message: "Consulta agendada com sucesso",
    };
  }
}
module.exports = CreateAppointmentUseCase;
