const UpdateProfileUseCase = require("../../../application/UpdateProfileUseCase");
const UserRepository = require("../../repositories/UserRepository");

class UpdateProfileController {
  async handle(request, response) {
    const { newPassword, oldPassword, newEmail, newName } = request.body;

    const { id } = request.user;
    const userRepository = new UserRepository();
    const updateProfileUseCase = new UpdateProfileUseCase(userRepository);

    const result = await updateProfileUseCase.execute({
      id,
      newPassword,
      oldPassword,
      newEmail,
      newName,
    });
    return response.status(200).json(result);
  }
}

module.exports = UpdateProfileController;
