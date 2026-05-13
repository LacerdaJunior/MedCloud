const { z } = require("zod");
const AppError = require("../../../errors/AppError");

const updateAppointmentSchema = z.object({
  status: z.enum(["scheduled", "finished", "cancelled"]),
});

function validateUpdateAppointmentBody(request, response, next) {
  const result = updateAppointmentSchema.safeParse(request.body);

  if (!result.success) {
    const flatErrors = result.error.flatten();
    const firstKey = Object.keys(flatErrors.fieldErrors)[0];
    const errorMessage = firstKey
      ? flatErrors.fieldErrors[firstKey][0]
      : "Dados do agendamento inválidos";

    throw new AppError(errorMessage, 400);
  }

  request.body = result.data;
  return next();
}

module.exports = { validateUpdateAppointmentBody, updateAppointmentSchema };
