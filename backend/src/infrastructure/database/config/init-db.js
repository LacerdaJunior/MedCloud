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
  } catch (error) {
    console.error("❌ Erro ao criar tabelas:", error);
  } finally {
    process.exit(0);
  }
}

CreateTables();
