const CreateUserUseCase = require("../../../application/CreateUserUseCase");
const UserRepository = require("../../repositories/userRepository");
const HashProvider = require("../../../infrastructure/providers/HashProvider");

class CreateUserController {
  async handle(request, response) {
    const { name, email, password } = request.body;
    const userRepository = new UserRepository();
    const passwordHasher = new HashProvider();

    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      passwordHasher,
    );
    try {
      const result = await createUserUseCase.execute(name, email, password);

      return response.status(201).json(result);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ error: error.message });
    }
  }
}

module.exports = CreateUserController;
