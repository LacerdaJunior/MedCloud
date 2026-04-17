const AppError = require("../errors/AppError");

class AuthenticateUserUseCase {
  constructor(userRepository, hashProvider, tokenJwtProvider) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
    this.tokenJwtProvider = tokenJwtProvider;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Credenciais inválidas", 400);
    }

    const userPassword = await this.hashProvider.compare(
      password,
      user.password,
    );

    if (!userPassword) {
      throw new AppError("Credenciais inválidas", 400);
    }

    const token = this.tokenJwtProvider.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token,
    };
  }
}
module.exports = AuthenticateUserUseCase;
