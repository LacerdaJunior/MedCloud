const ListProviderMonthAvailabilityUseCase = require("../src/application/ListProviderMonthAvailabilityUseCase");

describe("ListProviderMonthAvailabilityUseCase", () => {
  let fakeAppointmentsRepository;
  let listProviderMonthAvailabilityUseCase;

  beforeEach(() => {
    fakeAppointmentsRepository = {
      appointments: [],
      findAllInMonthFromProvider: async function ({ providerId, month, year }) {
        return this.appointments.filter(
          (appointment) =>
            appointment.doctorId === providerId &&
            appointment.date.getMonth() + 1 === month &&
            appointment.date.getFullYear() === year,
        );
      },
    };

    listProviderMonthAvailabilityUseCase =
      new ListProviderMonthAvailabilityUseCase(fakeAppointmentsRepository);
  });

  it("deve listar a disponibilidade do mês, bloqueando dias com 10 consultas", async () => {
    for (let hour = 8; hour <= 17; hour++) {
      fakeAppointmentsRepository.appointments.push({
        id: String(hour),
        doctorId: "medico-123",

        date: new Date(2026, 4, 15, hour, 0, 0),
      });
    }

    fakeAppointmentsRepository.appointments.push({
      id: "100",
      doctorId: "medico-123",
      date: new Date(2026, 4, 16, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailabilityUseCase.execute({
      providerId: "medico-123",
      year: 2026,
      month: 5,
    });

    const dia15 = availability.find((a) => a.day === 15);
    const dia16 = availability.find((a) => a.day === 16);

    expect(dia15.available).toBe(false);
    expect(dia16.available).toBe(true);
  });
});
