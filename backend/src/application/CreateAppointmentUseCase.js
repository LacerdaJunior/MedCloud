const app = require("../../app");
const Appointment = require("../domain/entities/Appointment");
const AppError = require("../errors/AppError");
const dayjs = require("dayjs");

class CreateAppointmentUseCase {
  constructor(AppointmentsRepository) {
    this.appointmentsRepository = AppointmentsRepository;
  }

  async execute({ title, description, patientId, doctorId, date }) {
    const appointmentDate = dayjs(date);

    if (appointmentDate.minute() !== 0) {
      throw new AppError("Consultas apenas podem ser de hora em hora.", 400);
    }

    if (!appointmentDate.isValid()) {
      throw new AppError("Formato de data inválido.", 400);
    }

    if (appointmentDate.isBefore(dayjs())) {
      throw new AppError("A Consulta não pode ser agendada no passado.", 400);
    }

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
