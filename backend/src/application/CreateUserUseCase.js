const User = require("../domain/entities/User");

const crypto = require("crypto");
const AppError = require("../errors/AppError");

class CreateUserUseCase {
  constructor(userRepository, hashProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  async execute(name, email, password, role) {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError("O email informado já está em uso.", 401);
    }
    const generatedId = crypto.randomUUID();

    const user = new User(generatedId, name, email, password, "user");

    const hashedPassword = await this.hashProvider.hash(user.password);

    user.password = hashedPassword;
    await this.userRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      message: "Usuário criado com sucesso",
    };
  }
}
module.exports = CreateUserUseCase;
