const request = require("supertest");
const app = require("../../../../app");
const bcrypt = require("bcrypt");
const UserRepository = require("../../repositories/userRepository");

jest.mock("../../repositories/userRepository");

describe("Session Routes", () => {
  it("deve autenticar um usuário válido e retornar status 200 com o token JWT", async () => {
    const fakePasswordHash = await bcrypt.hash("senha123", 10);

    UserRepository.prototype.findByEmail.mockResolvedValue({
      id: "40fb4118-e13d-448d-abd1-6dd36cc0afd4",
      name: "Guilherme",
      email: "gui@email.com",
      password: fakePasswordHash,
      role: "admin",
    });

    const response = await request(app)
      .post("/sessions")
      .send({ email: "gui@email.com", password: "senha123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("deve barrar o  usuário, com login inválido,  e retornar status 400", async () => {
    const fakePasswordHash = await bcrypt.hash("senha123", 10);

    UserRepository.prototype.findByEmail.mockResolvedValue({
      id: "40fb4118-e13d-448d-abd1-6dd36cc0afd2",
      name: "Guilherme",
      email: "gui1@email.com",
      password: fakePasswordHash,
      role: "admin",
    });

    const response = await request(app)
      .post("/sessions")
      .send({ email: "gui@esmail.com", password: "senha1223" });

    expect(response.status).toBe(401);
  });
});
