const pool = require("../database/config/connection");

class UserRepository {
  async save(users) {
    const user = await pool.query(
      `
        INSERT INTO users (id, name, email, password, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [users.id, users.name, users.email, users.password, users.role],
    );

    return user.rows[0];
  }

  async findByEmail(email) {
    const isEmailInUse = await pool.query(
      `SELECT * FROM users WHERE email  = $1`,
      [email],
    );
    if (isEmailInUse.rows.length > 0) {
      return isEmailInUse.rows[0];
    }
    return null;
  }

  async findById(id) {
    const result = await pool.query(`SELECT * FROM users WHERE id  = $1`, [id]);
    if (result.rows.length > 0) {
      return userId.rows[0];
    }
    return null;
  }

  async updateProfile({ newPassword, newEmail, newName, id }) {
    const result = await pool.query(
      `
    UPDATE users
    SET
    password = COALESCE($1, password),
    email = COALESCE($2, email),
    name = COALESCE($3, name),
    updated_at = NOW()
    WHERE id = $4
    RETURNING id, name, email, role, updated_at
    `,
      [newPassword, newEmail, newName, id],
    );

    return result.rows[0] || null;
  }
}
module.exports = UserRepository;
