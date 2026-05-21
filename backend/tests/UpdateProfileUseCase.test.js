const UpdateProfileUseCase = require("../src/application/UpdateProfileUseCase");
const AppError = require("../src/errors/AppError");

// 1. Criamos o "dublê" (Mock) do repositório com as funções que o UseCase usa
const userRepositoryMock = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  updateProfile: jest.fn(),
};

// 2. Injetamos o mock no UseCase
const updateProfileUseCase = new UpdateProfileUseCase(userRepositoryMock);

describe("UpdateProfileUseCase", () => {
  // Limpa os mocks antes de cada teste para um não atrapalhar o outro
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Deve permitir alterar o nome de usuário", async () => {
    const user = {
      id: "123",
      name: "Guilherme",
      email: "gui@test.com",
    };

    // Simulamos que o usuário existe no banco
    userRepositoryMock.findById.mockResolvedValue(user);

    // Simulamos o retorno do banco após o update
    userRepositoryMock.updateProfile.mockResolvedValue({
      ...user,
      name: "Novo Nome",
    });

    const result = await updateProfileUseCase.execute({
      userId: "123",
      newName: "Novo Nome",
    });

    expect(result.name).toBe("Novo Nome");
    expect(userRepositoryMock.updateProfile).toHaveBeenCalled();
  });

  it("Não deve permitir alterar senha sem enviar a senha antiga", async () => {
    const user = {
      id: "123",
      password: "hashed_password",
    };

    userRepositoryMock.findById.mockResolvedValue(user);

    // O UseCase deve lançar um AppError porque não enviamos oldPassword
    await expect(
      updateProfileUseCase.execute({
        userId: "123",
        newPassword: "nova_senha_123",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
