const { z } = require("zod");
const AppError = require("../../../errors/AppError");

const listProviderMonthAvailabilitySchema = z.object({
  month: z.coerce.number().min(1).max(12, "Mês inválido"),
  year: z.coerce.number().min(2020, "Ano inválido"),
});

function validateListProviderMonthAvailabilityQuery(request, response, next) {
  const result = listProviderMonthAvailabilitySchema.safeParse(request.query);

  if (!result.success) {
    const flatErrors = result.error.flatten();
    const firstKey = Object.keys(flatErrors.fieldErrors)[0];
    const errorMessage = firstKey
      ? flatErrors.fieldErrors[firstKey][0]
      : "Parâmetros de data inválidos";

    throw new AppError(errorMessage, 400);
  }

  request.query = result.data;
  return next();
}

module.exports = {
  validateListProviderMonthAvailabilityQuery,
  listProviderMonthAvailabilitySchema,
};
