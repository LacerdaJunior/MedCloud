const request = require("supertest");

const app = require("../../../../app");

jest.mock("../../../infrastructure/repositories/userRepository");

describe("User Routes ", () => {
  it("deve criar um usuário e retornar status 201 na rota POST /users", async () => {
    const response = await request(app).post("/users").send({
      name: "Guilherme Integração",
      email: "gui.teste@email.com",
      password: "senha-segura-123",
    });
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("deve barrar o usuário e retornar status 400 na rota POST /users", async () => {
    const response = await request(app).post("/users").send({
      name: "Guilherme Integração",
      email: "gui.testeemail.com",
      password: "senha-segura-123",
    });
    console.log(response.body);
    expect(response.status).toBe(400);
 
  });
});
