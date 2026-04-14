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
}
module.exports = UserRepository;
