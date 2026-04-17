const AppError = require("../errors/AppError");

class GetProfileUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    return {
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    };
  }
}
module.exports = GetProfileUseCase;
