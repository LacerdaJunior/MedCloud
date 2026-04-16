const pool = require("../database/config/connection");

class AppointmentsRepository {
  async save({ id, title, description, patient_id, doctor_id, date }) {
    await pool.query(
      "INSERT INTO appointments(id, title, description, patient_id, doctor_id, date) VALUES ($1, $2, $3, $4, $5, $6)",
      [id, title, description, patient_id, doctor_id, date],
    );
  }

  async appointmentIsTaken(doctorId, appoinmentDate) {
    const result = await pool.query(
      "SELECT * FROM appointments WHERE doctor_id = $1 AND date = $2",
      [doctorId, appoinmentDate],
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  }
}
module.exports = AppointmentsRepository;
