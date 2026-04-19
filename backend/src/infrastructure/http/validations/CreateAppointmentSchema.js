const { z } = require("zod");

const createAppointmentSchema = z.object({
  title: z.string().min(4, "O titulo deve ter no mínimo 4 letras"),
  description: z.string().min(1, "A descrição não pode estar vazia").optional(),
  patientId: z.string().uuid("ID do paciente inválido."),
  doctorId: z.string().uuid("ID do doutor inválido."),
  date: z.string().datetime("Data deve estar no formato ISO."),
});

