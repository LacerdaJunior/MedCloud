const User = require("../domain/entities/User");

class CreateAppointmentUseCase {
  constructor(AppointmentsRepository) {
    this.AppointmentsRepository;
  }

  async execute(patientId, doctorId, date, title, description, ) {
    const emailAlreadyExists = await this.userRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new Error("O email informado já está em uso.");
    }
    const generatedId = crypto.randomUUID();

    const user = new User(generatedId, name, email, password);

    const hashedPassword = await this.hashProvider.hash(user.password);

    user.password = hashedPassword;
    await this.userRepository.save(user);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      message: "Usuário criado com sucesso",
    };
  }
}
module.exports = CreateAppointmentUseCase;
