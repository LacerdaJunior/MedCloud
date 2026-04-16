class Appointment {
  constructor({ title, description, patientId, doctorId, date }) {
    const generatedId = crypto.randomUUID();
    const defaultStatus = "scheduled";
    this.id = generatedId;
    this.status = defaultStatus;

    const now = new Date();
    this.date = date;
    if (this.date < now) {
      throw new Error("Não é possível agendar no passado");
    }

    if (!title || !patientId || !doctorId) {
      throw new Error("A consulta deve ter todos dados preenchidos.");
    }

    this.title = title;
    this.description = description;
    this.patientId = patientId;
    this.doctorId = doctorId;
  }
}
module.exports = Appointment;
