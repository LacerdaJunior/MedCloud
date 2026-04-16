const pool = require("./connection");

async function CreateTables() {
  try {
    await pool.query(`

        CREATE TABLE users(
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(90) NOT NULL,
        email VARCHAR(150) NOT NULL,
        password TEXT  NOT NULL,
        role VARCHAR(15) NOT NULL
        );
        `);
    console.log("Tabela users criada com sucesso!");

    await pool.query(`

        CREATE TABLE appointments(
        id VARCHAR(36) PRIMARY KEY,
        title VARCHAR(90) NOT NULL,
        description VARCHAR(150),
        patient_id VARCHAR(36)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        doctor_id VARCHAR(36)  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        status TEXT NOT NULL DEFAULT 'scheduled',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        date TIMESTAMP NOT NULL
        );
        `);
    console.log("Tabela appoinments criada com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao criar tabelas:", error);
  } finally {
    process.exit(0);
  }
}

CreateTables();
