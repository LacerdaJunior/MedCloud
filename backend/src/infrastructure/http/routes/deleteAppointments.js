const app = require("../../../../app");
const request = require("supertest");
const pool = require("../../database/config/connection"); 

describe("Delete Appointments (DELETE /appointments/:appointmentId)", () => {
  let patientToken;
  let adminToken;
  let appointmentId;

  beforeAll(async () => {
   
    const patientResponse = await request(app).post("/users").send({
      name: "Paciente Delete",
      email: "pacientedelete@gmail.com",
      password: "senha123",
    });
    const patientId = patientResponse.body.id;

    const patientLogin = await request(app).post("/sessions").send({
      email: "pacientedelete@gmail.com",
      password: "senha123",
    });
    patientToken = patientLogin.body.token;


    const adminResponse = await request(app).post("/users").send({
      name: "Admin Delete",
      email: "admindelete@gmail.com",
      password: "senha123",
    });
    const adminId = adminResponse.body.id;


    await pool.query("UPDATE users SET role = 'admin' WHERE email = 'admindelete@gmail.com'");

    const adminLogin = await request(app).post("/sessions").send({
      email: "admindelete@gmail.com",
      password: "senha123",
    });
    adminToken = adminLogin.body.token;

  
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);

    const appointmentResponse = await request(app)
      .post("/appointments")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        title: "Consulta para Deletar",
        description: "Teste de deleção",
        patientId: patientId,
        doctorId: adminId,
        date: futureDate
      });
    

    appointmentId = appointmentResponse.body.id; 
  });


  afterAll(async () => {
    try {
      await pool.query("DELETE FROM appointments WHERE title = 'Consulta para Deletar'");
      await pool.query("DELETE FROM users WHERE email IN ('pacientedelete@gmail.com', 'admindelete@gmail.com')");
    } catch (error) {
      console.log("Erro na limpeza do banco:", error.message);
    } finally {
      await pool.end();
    }
  });

 
  
  it("deve barrar o acesso e retornar 403 se um usuário não-admin tentar deletar uma consulta.", async () => {
    const response = await request(app)
      .delete(`/appointments/123-id-falso`) 
      .set("Authorization", `Bearer ${patientToken}`); 
    
    expect(response.status).toBe(403);
  });

  // Caminho Feliz
  it("deve permitir que um administrador delete uma consulta existente.", async () => {
    const response = await request(app)
      .delete(`/appointments/${appointmentId}`) 
      .set("Authorization", `Bearer ${adminToken}`); 
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Consulta deletada com sucesso.");
  });
});