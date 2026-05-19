const AppError = require("../errors/AppError");
const bcrypt = require("bcrypt");

class UpdateProfileUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ id, newPassword, oldPassword, newEmail, newName }) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    if (newEmail) {
      const userWithUpdatedEmail =
        await this.userRepository.findByEmail(newEmail);
      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
        throw new AppError("Este e-mail já está em uso.");
      }
    }

    let hashedPassword = null;

    if (newPassword) {
      if (!oldPassword) {
        throw new AppError(
          "Você precisa informar a senha antiga para definir uma nova senha.",
        );
      }

      const checkOldPassword = await bcrypt.compare(oldPassword, user.password);

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.");
      }

      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    return await this.userRepository.updateProfile({
      id,
      newName: newName || null,
      newEmail: newEmail || null,
      newPassword: hashedPassword || null,
    });
  }
}

module.exports = UpdateProfileUseCase;
