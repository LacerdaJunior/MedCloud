const Appointment = require("../domain/entities/Appointment");
const AppError = require("../errors/AppError");

class CreateAppointmentUseCase {
  constructor(AppointmentsRepository) {
    this.appointmentsRepository = AppointmentsRepository;
  }

  async execute({ title, description, patientId, doctorId, date }) {
    const appointment = new Appointment({
      title,
      description,
      patientId,
      doctorId,
      date,
    });

    const checkResult = await this.appointmentsRepository.findByDoctorAndDate({
      doctorId,
      date,
    });

    if (checkResult) {
      throw new AppError(
        "A Consulta não pode ser agendada, pois o horário já está ocupado.",
        409,
      );
    }
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
