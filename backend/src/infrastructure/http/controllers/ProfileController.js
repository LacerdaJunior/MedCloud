const GetProfileUseCase = require("../../../application/GetProfileUseCase");
const UserRepository = require("../../repositories/userRepository");

class ProfileController {
  async handle(request, response) {
    const { id } = request.user;

    const userRepository = new UserRepository();
    const getProfileUseCase = new GetProfileUseCase(userRepository);

    const result = await getProfileUseCase.execute(id);
    return response.status(200).json(result);
  }
}

module.exports = ProfileController;
