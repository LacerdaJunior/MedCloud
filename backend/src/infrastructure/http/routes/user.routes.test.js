const request = require("supertest");
const TokenJwtProvider = require("../../providers/TokenJwtProvider");
const app = require("../../../../app");

jest.mock("../../../infrastructure/repositories/userRepository");
jest.mock("../../repositories/AppointmentsRepository");

describe("User Routes ", () => {
  it("deve criar um usuário e retornar status 201 na rota POST /users", async () => {
    const response = await request(app).post("/users").send({
      name: "Guilherme Integração",
      email: "gui.teste@email.com",
      password: "senha-segura-123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("deve barrar o usuário e retornar status 400 na rota POST /users", async () => {
    const response = await request(app).post("/users").send({
      name: "Guilherme Integração",
      email: "gui.testeemail.com",
      password: "senha-segura-123",
    });

    expect(response.status).toBe(400);
  });

  it("deve barrar o usuário de agendar consulta se não for admin, error 403", async () => {
    const token = new TokenJwtProvider().generateToken({
      id: "hello-fake-id",
      role: "user",
    });

    const response = await request(app)
      .post("/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Consulta Teste",
        description: "Exame de rotina",
        patientId: "40fb4118-e13d-448d-abd1-6dd36cc0afd5",
        doctorId: "40fb4118-e13d-448d-abd1-6dd36cc0afd4",
        date: new Date(Date.now() + 10000),
      });

    expect(response.status).toBe(403);
  });

  it("deve permitir o admin agendar uma consulta com sucesso, 201 Created", async () => {
    const token = new TokenJwtProvider().generateToken({
      id: "hello-fake-id",
      role: "admin",
    });

    const response = await request(app)
      .post("/appointments")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Consulta Teste",
        description: "Exame de rotina",
        patientId: "40fb4118-e13d-448d-abd1-6dd36cc0afd2",
        doctorId: "40fb4118-e13d-448d-abd1-6dd36cc0afd1",
        date: new Date(Date.now() + 10000),
      });

    expect(response.status).toBe(201);
  });
});
