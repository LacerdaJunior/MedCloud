const AppError = require("../../errors/AppError");
const pool = require("../database/config/connection");

class AppointmentsRepository {
  async save({ id, title, description, patientId, doctorId, date }) {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

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

  async findByDoctorAndDate({ doctorId, date }) {
    const result = await pool.query(
      "SELECT * FROM appointments WHERE doctor_id = $1 AND date = $2",
      [doctorId, date],
    );
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null;
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

  async findManyByUserId({ userId, role, status, limit, offset }) {
    const columname = role === "admin" ? "doctor_id" : "patient_id";

    let query = `SELECT * FROM appointments WHERE ${columname} = $1`;
    let countQuery = `SELECT COUNT (*) FROM appointments WHERE ${columname} = $1`;
    let values = [userId];

    if (status) {
      values.push(status);
      query += ` AND status = $${values.length}`;
      countQuery += ` AND status = $${values.length}`;
    }

    query += ` ORDER BY date ASC`;
    const countResult = await pool.query(countQuery, values);
    values.push(limit);
    query += ` LIMIT $${values.length}`;

    values.push(offset);
    query += ` OFFSET $${values.length}`;

    const result = await pool.query(query, values);

    return {
      appointments: result.rows,
      total: countResult.rows[0].count,
    };
  }

  async findAllInDayFromProvider({ providerId, day, month, year }) {
    const result = await pool.query(
      `SELECT * FROM appointments 
       WHERE doctor_id = $1 
       AND EXTRACT(DAY FROM date) = $2 
       AND EXTRACT(MONTH FROM date) = $3 
       AND EXTRACT(YEAR FROM date) = $4
       AND status != 'cancelled'`,
      [providerId, day, month, year],
    );

    return result.rows;
  }

  async findAllInMonthFromProvider({ providerId, month, year }) {
    const result = await pool.query(
      `SELECT * FROM appointments 
       WHERE doctor_id = $1 
       AND EXTRACT(MONTH FROM date) = $2 
       AND EXTRACT(YEAR FROM date) = $3
       AND status != 'cancelled'`,
      [providerId, month, year],
    );

    return result.rows;
  }
  async findProviderScheduleByDay({ providerId, day, month, year }) {
    const result = await pool.query(
      `SELECT 
        a.id, 
        a.title, 
        a.description, 
        a.date, 
        a.status,
        u.name AS patient_name 
       FROM appointments a
       JOIN users u ON u.id = a.patient_id
       WHERE a.doctor_id = $1 
       AND EXTRACT(DAY FROM a.date) = $2 
       AND EXTRACT(MONTH FROM a.date) = $3 
       AND EXTRACT(YEAR FROM a.date) = $4
       AND a.status != 'cancelled'
       ORDER BY a.date ASC`,
      [providerId, day, month, year],
    );

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
