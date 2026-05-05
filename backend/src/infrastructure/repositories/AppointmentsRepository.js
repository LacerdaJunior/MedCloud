const AppError = require("../../errors/AppError");
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
        throw new AppError(
          "Erro ao marcar consulta, horário já está ocupado",
          409,
        );
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

  async updateAppointment(newStatus, appointmentId) {
    await pool.query(`UPDATE appointments SET status = $1 WHERE id = $2 `, [
      newStatus,
      appointmentId,
    ]);
    return true;
  }

  async findByAppointmentId(appointmentId) {
    const result = await pool.query(
      `SELECT * FROM appointments WHERE id = $1`,
      [appointmentId],
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  }

  async findManyByUserId({ userId, role, status }) {
    const columname = role === "admin" ? "doctor_id" : "patient_id";

    let query = `SELECT * FROM appointments WHERE ${columname} = $1`;
    let values = [userId];

    if (status) {
      query += `AND status = $2 `;
      values.push(status);
    }
    query += ` ORDER BY date ASC`;

    const result = await pool.query(query, values);
    return result.rows;
  }

  async deleteAppointment(id) {
    const result = await pool.query(
      `DELETE FROM appointments 
       WHERE id = $1 
       RETURNING *`,
      [id],
    );

    return result.rows[0];
  }
}
module.exports = AppointmentsRepository;
