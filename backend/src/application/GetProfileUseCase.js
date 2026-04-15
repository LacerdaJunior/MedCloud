class GetProfileUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(id) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("Usuário não encontrado");
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
