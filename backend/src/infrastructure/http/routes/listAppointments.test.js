const request = require("supertest");
const app = require("../../../../app"); 
const pool = require("../../database/config/connection"); 

describe("List Appointments (GET /appointments)", () => {
  let userToken;
  let doctorId;
  let patientId;

  
  beforeAll(async () => {
    
    const doctorResponse = await request(app).post("/users").send({
      name: "Dra. Teste GET",
      email: "draget@medcloud.com",
      password: "senha123",
      role: "admin", 
    });
    doctorId = doctorResponse.body.id;


    await pool.query("UPDATE users SET role = 'admin' WHERE email = 'draget@medcloud.com'");

  
    const loginResponse = await request(app).post("/sessions").send({
      email: "draget@medcloud.com",
      password: "senha123",
    });
    userToken = loginResponse.body.token;

  
    const patientResponse = await request(app).post("/users").send({
      name: "Paciente Teste GET",
      email: "pacienteget@medcloud.com",
      password: "senha123",
      role: "patient",
    });
    patientId = patientResponse.body.id;


    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);

    await request(app)
      .post("/appointments")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        title: "Consulta Automatizada",
        description: "Teste de listagem",
        patientId: patientId, 
        doctorId: doctorId,   
        date: futureDate
      });
  });


  afterAll(async () => {
    try {
      await pool.query("DELETE FROM appointments WHERE title = 'Consulta Automatizada'");
      await pool.query("DELETE FROM users WHERE email IN ('draget@medcloud.com', 'pacienteget@medcloud.com')");
    } catch (error) {
      console.log("Erro na limpeza do banco:", error.message);
    } finally {
      await pool.end();
    }
  });

 
  it("deve ser capaz de listar os agendamentos do usuário logado", async () => {
    const response = await request(app)
      .get("/appointments")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("title", "Consulta Automatizada");
  });
});