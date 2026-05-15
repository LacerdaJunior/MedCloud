const CreateAppointmentUseCase = require("../../../application/CreateAppointmentUseCase");

describe("Appointment Routes", () => {
  it("Deve lançar erro se o horário já estiver ocupado", async () => {
    const mockAppointmentsRepository = {
      findByDoctorAndDate: async () => null,
      save: async () => {
        throw new Error("Erro ao marcar consulta, horário já está ocupado");
      },
    };

    const useCase = new CreateAppointmentUseCase(mockAppointmentsRepository);

    const datePerfeita = new Date(2026, 10, 15, 10, 0, 0);

    await expect(
      useCase.execute({
        title: "appointment test",
        description: "routine",
        patientId: "123",
        doctorId: "12322",
        date: datePerfeita,
      }),
    ).rejects.toThrow("Erro ao marcar consulta, horário já está ocupado");
  });

  it("Deve permitir o usuário agendar uma consulta", async () => {
    const mockAppointmentsRepository = {
      findByDoctorAndDate: async () => null,
      save: async () => true,
    };

    const useCase = new CreateAppointmentUseCase(mockAppointmentsRepository);

    const datePerfeita = new Date(2026, 10, 15, 10, 0, 0);

    const result = await useCase.execute({
      title: "appointment test",
      description: "routine",
      patientId: "123",
      doctorId: "12322",
      date: datePerfeita,
    });

    expect(result.message).toBe("Consulta agendada com sucesso");
  });
});
