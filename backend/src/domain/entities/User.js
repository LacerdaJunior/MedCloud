class User {
  constructor(id, name, email, password, role) {
    if (!name) {
      throw new Error("O usuário deve conter um nome.");
    }
    if (!email.includes("@")) {
      throw new Error("O email deve conter @.");
    }
    if (password.length < 6) {
      throw new Error("A senha deve conter ao menos 6 caracteres.");
    }

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
module.exports = User;
