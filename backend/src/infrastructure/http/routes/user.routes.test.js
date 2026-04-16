const request = require("supertest");
const TokenJwtProvider = require("../../providers/TokenJwtProvider");
const app = require("../../../../app");

jest.mock("../../../infrastructure/repositories/userRepository");

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

  it("deve barrar o usuário de acessar arota rota GET em /test se não for admin, error 403", async () => {
    const token = new TokenJwtProvider().generateToken({
      id: "hello-fake-id",
      role: "user",
    });

    const response = await request(app)
      .get("/users/test")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
  });

   it("deve permitir o usuário acessar a rota rota GET em /test caso sua role seja admin, 200 ok", async () => {
    const token = new TokenJwtProvider().generateToken({
      id: "hello-fake-id",
      role: "admin",
    });

    const response = await request(app)
      .get("/users/test")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
