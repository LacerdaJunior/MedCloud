const { z, ZodError } = require("zod");
const AppError = require("../../../errors/AppError");

const createAppointmentSchema = z.object({
  title: z.string().min(4, "O titulo deve ter no mínimo 4 letras"),
  description: z.string().min(1, "A descrição não pode estar vazia").optional(),
  patientId: z.string().uuid("ID do paciente inválido."),
  doctorId: z.string().uuid("ID do doutor inválido."),
  date: z.string().datetime("Data deve estar no formato ISO."),
});

function validateAppointmentBody(request, response, next) {
  try {
    const data = createAppointmentSchema.parse(request.body);
    request.body = data;
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      throw new AppError(error.errors[0].message, 400);
    }
    return next(error);
  }
}

module.exports = { validateAppointmentBody, createAppointmentSchema };
