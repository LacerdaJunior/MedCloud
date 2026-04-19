const AppError = require("../../../errors/AppError");
const { z, ZodError } = require("zod");

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
