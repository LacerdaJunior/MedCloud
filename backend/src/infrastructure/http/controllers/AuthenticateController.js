const AuthenticateUserUseCase = require("../../../application/AuthenticateUserUseCase");
const UserRepository = require("../../repositories/userRepository");
const TokenJwtProvider = require("../../../infrastructure/providers/TokenJwtProvider");
const HashProvider = require("../../../infrastructure/providers/HashProvider");

class AuthenticateUserController {
  async handle(request, response) {
    const { email, password } = request.body;

    const hashProvider = new HashProvider();
    const tokenJwt = new TokenJwtProvider();
    const userRepository = new UserRepository();

    const authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepository,
      hashProvider,
      tokenJwt,
    );

    try {
      const result = await authenticateUserUseCase.execute(email, password);

      return response.status(200).json(result);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthenticateUserController;
