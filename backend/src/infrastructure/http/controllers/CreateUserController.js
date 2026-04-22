const CreateUserUseCase = require("../../../application/CreateUserUseCase");
const UserRepository = require("../../repositories/userRepository");
const HashProvider = require("../../../infrastructure/providers/HashProvider");

class CreateUserController {
  async handle(request, response) {
    const { name, email, password, role } = request.body;
    const userRepository = new UserRepository();
    const passwordHasher = new HashProvider();

    const createUserUseCase = new CreateUserUseCase(
      userRepository,
      passwordHasher,
    );
   
      const result = await createUserUseCase.execute(name, email, password, role);

      return response.status(201).json(result);
   

  }
}

module.exports = CreateUserController;
