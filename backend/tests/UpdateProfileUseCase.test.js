const UpdateProfileUseCase = require("../src/application/UpdateProfileUseCase");
const AppError = require("../src/errors/AppError");

const userRepositoryMock = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  updateProfile: jest.fn(),
};

const updateProfileUseCase = new UpdateProfileUseCase(userRepositoryMock);

describe("UpdateProfileUseCase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Deve permitir alterar o nome de usuário", async () => {
    const user = {
      id: "123",
      name: "Guilherme",
      email: "gui@test.com",
    };

    userRepositoryMock.findById.mockResolvedValue(user);

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

    await expect(
      updateProfileUseCase.execute({
        userId: "123",
        newPassword: "nova_senha_123",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
