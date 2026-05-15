const ListProviderDayAvailabilityUseCase = require("../src/application/ListProviderDayAvailabilityUseCase");

describe("ListProviderDayAvailabilityUseCase", () => {
  let fakeAppointmentsRepository;
  let listProviderDayAvailabilityUseCase;

  beforeEach(() => {
    fakeAppointmentsRepository = {
      appointments: [],
      findAllInDayFromProvider: async function ({
        providerId,
        day,
        month,
        year,
      }) {
        return this.appointments.filter(
          (appointment) =>
            appointment.doctorId === providerId &&
            appointment.date.getDate() === day &&
            appointment.date.getMonth() + 1 === month &&
            appointment.date.getFullYear() === year,
        );
      },
    };

    listProviderDayAvailabilityUseCase = new ListProviderDayAvailabilityUseCase(
      fakeAppointmentsRepository,
    );
  });

  it("deve listar a disponibilidade do dia, bloqueando horários ocupados", async () => {
    fakeAppointmentsRepository.appointments.push({
      id: "1",
      doctorId: "medico-123",
      date: new Date(2026, 4, 15, 10, 0, 0),
    });

    fakeAppointmentsRepository.appointments.push({
      id: "2",
      doctorId: "medico-123",
      date: new Date(2026, 4, 15, 14, 0, 0),
    });

    const availability = await listProviderDayAvailabilityUseCase.execute({
      providerId: "medico-123",
      year: 2026,
      month: 5,
      day: 15,
    });

    const hour10 = availability.find((a) => a.hour === 10);
    const hour11 = availability.find((a) => a.hour === 11);
    const hour14 = availability.find((a) => a.hour === 14);

    expect(hour10.available).toBe(false); // Ocupado
    expect(hour14.available).toBe(false); // Ocupado
    expect(hour11.available).toBe(true); // Livre
  });
});
