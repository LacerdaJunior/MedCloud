const CreateAppointmentUseCase = require("../../../application/CreateAppointmentUseCase");

jest.mock("../../repositories/AppointmentsRepository");

describe("Appointment Routes", () => {
  it("Deve lançar erro se o horário já estiver ocupado", async () => {
    const mockAppointmentsRepository = {
      save: async () => {
        throw new Error("Erro ao marcar consulta, horário já está ocupado");
      },
    };

    const useCase = new CreateAppointmentUseCase(mockAppointmentsRepository);

    const date = new Date();
    date.setDate(date.getDate() + 7); 

    await expect(
      useCase.execute("appointment test", "routine", "123", "12322", date),
    ).rejects.toThrow("Erro ao marcar consulta, horário já está ocupado");
  });

  it("Deve permitir o usuário agendar uma consulta", async () => {
    const mockAppointmentsRepository = {
      save: async () => true,
    };

    const useCase = new CreateAppointmentUseCase(mockAppointmentsRepository);
   
    const date = new Date();
    date.setDate(date.getDate() + 7); 
    const result = await useCase.execute(
      "appointment test",
      "routine",
      "123",
      "12322",
      date,
    );

    expect(result.message).toBe("Consulta agendada com sucesso");
  });
});
