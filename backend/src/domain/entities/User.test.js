const User = require("./User");

describe("User Entity", () => {
  it("deve criar um usuário com sucesso quando os dados forem válidos", () => {
    const user = new User(
      "123",
      "Guilherme",
      "gui@email.com",
      "senha123",
      "admin",
    );

    expect(user.name).toBe("Guilherme");
  });

  it("deve lançar um erro se o nome não for informado", () => {
    expect(() => {
      new User("123", "", "gui@email.com", "senha123", "admin");
    }).toThrow("O usuário deve conter um nome.");
  });

  it("deve lançar um erro se email não conter @", () => {
    expect(() => {
      new User("123", "Guilherme", "guiemail.com", "senha123", "admin");
    }).toThrow("O email deve conter @.");
  });

  it("deve lançar um erro se a senha não conter ao menos 6 caracteres", () => {
    expect(() => {
      new User("123", "Guilherme", "gui@email.com", "s123", "admin");
    }).toThrow("A senha deve conter ao menos 6 caracteres.");
  });
});
