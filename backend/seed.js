const pool = require("./src/infrastructure/database/config/connection");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

async function runSeed() {
  console.log(" Iniciando o plantio de dados (Seed completo)...");

  try {
    const hashedPassword = await bcrypt.hash("123456", 10);

    const doctorId = "550e8400-e29b-41d4-a716-446655440000";
    const doctorEmail = "medico@medcloud.com";

    const docCheck = await pool.query("SELECT id FROM users WHERE email = $1", [
      doctorEmail,
    ]);
    let finalDoctorId = docCheck.rows[0]?.id;

    if (!finalDoctorId) {
      await pool.query(
        `INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5)`,
        [doctorId, "Dr. Roberto Silva", doctorEmail, hashedPassword, "admin"],
      );
      finalDoctorId = doctorId;
      console.log(" Médico de teste criado com sucesso!");
    } else {
      console.log(" Médico de teste já existia no banco.");
    }

    const patientId = "660e8400-e29b-41d4-a716-446655440000";
    const patientEmail = "paciente@medcloud.com";

    const patCheck = await pool.query("SELECT id FROM users WHERE email = $1", [
      patientEmail,
    ]);
    let finalPatientId = patCheck.rows[0]?.id;

    if (!finalPatientId) {
      await pool.query(
        `INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5)`,
        [patientId, "Carlos Paciente", patientEmail, hashedPassword, "patient"],
      );
      finalPatientId = patientId;
      console.log(" Paciente de teste criado com sucesso!");
    } else {
      console.log(" Paciente de teste já existia no banco.");
    }

    await pool.query(
      "DELETE FROM appointments WHERE patient_id = $1 OR doctor_id = $2",
      [finalPatientId, finalDoctorId],
    );

    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    amanha.setMinutes(0, 0, 0);

    const horario1 = new Date(amanha);
    horario1.setHours(9);
    const horario2 = new Date(amanha);
    horario2.setHours(14);
    const horario3 = new Date(amanha);
    horario3.setHours(16);

    const appointmentsToInsert = [
      {
        id: crypto.randomUUID(),
        title: "Check-up Anual Cardiologia",
        description:
          "Avaliação eletrocardiograma e exames de sangue de rotina.",
        date: horario1,
      },
      {
        id: crypto.randomUUID(),
        title: "Consulta de Retorno",
        description:
          "Análise de evolução do tratamento prescrito no mês passado.",
        date: horario2,
      },
      {
        id: crypto.randomUUID(),
        title: "Análise de Exames",
        description: "Apresentação de exames laboratoriais solicitados.",
        date: horario3,
      },
    ];

    for (const app of appointmentsToInsert) {
      await pool.query(
        `INSERT INTO appointments (id, title, description, patient_id, doctor_id, date) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          app.id,
          app.title,
          app.description,
          finalPatientId,
          finalDoctorId,
          app.date,
        ],
      );
    }

    console.log(
      " 3 Agendamentos falsos criados para AMANHÃ às 09:00, 14:00 e 16:00!",
    );
    console.log(
      "✅ Seed finalizado com sucesso! O banco está pronto para o show.",
    );
  } catch (error) {
    console.error("❌ Erro ao executar o Seed:", error);
  } finally {
    await pool.end();
  }
}

runSeed();
