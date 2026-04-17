const pool = require("../database/config/connection");

class AppointmentsRepository {
  async save({ id, title, description, patientId, doctorId, date }) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const checkResult = await client.query(
        "SELECT * FROM appointments WHERE doctor_id = $1 AND date = $2",
        [doctorId, date],
      );

      if (checkResult.rows.length > 0) {
        throw new Error("Erro ao marcar consulta, horário já está ocupado");
      }

      await client.query(
        "INSERT INTO appointments(id, title, description, patient_id, doctor_id, date) VALUES ($1, $2, $3, $4, $5, $6)",
        [id, title, description, patientId, doctorId, date],
      );

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async findManyById(userId, role) {
    const columname = role === "admin" ? "doctor_id" : "patient_id";

    const query = `SELECT * FROM appointments WHERE ${columname} = $1 ORDER BY date ASC`;

    const result = await pool.query(query, [userId]);

    return result.rows;
  }
}
module.exports = AppointmentsRepository;
