const { z } = require("zod");
const AppError = require("../../../errors/AppError");

const createAppointmentSchema = z.object({
  title: z.string().min(4, "O titulo deve ter no mínimo 4 letras"),
  description: z.string().min(1, "A descrição não pode estar vazia").optional(),
  patientId: z.string().uuid("ID do paciente inválido."),
  doctorId: z.string().uuid("ID do doutor inválido."),
  date: z.string().datetime("Data deve estar no formato ISO."),
});

function validateAppointmentBody(request, response, next) {
  const result = createAppointmentSchema.safeParse(request.body);

  if (!result.success) {
    const flatErrors = result.error.flatten();
    const firstKey = Object.keys(flatErrors.fieldErrors)[0];
    const errorMessage = firstKey
      ? flatErrors.fieldErrors[firstKey][0]
      : "Formato de dados inválido.";

    throw new AppError(errorMessage, 400);
  }

  request.body = result.data;
  return next();
}

module.exports = { validateAppointmentBody, createAppointmentSchema };
