const { z } = require("zod");
const AppError = require("../../../errors/AppError");


const createUserSchema = z.object({
  name: z.string().min(3, "O nome deve conter no mínimo 3 caracteres."),
  email: z.string().email("O formato do e-mail é inválido."),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres."),
});


function validateUserBody(request, response, next) {
  const result = createUserSchema.safeParse(request.body);

  if (!result.success) {
    const flatErrors = result.error.flatten();
    const firstKey = Object.keys(flatErrors.fieldErrors)[0];
    const errorMessage = firstKey
      ? flatErrors.fieldErrors[firstKey][0]
      : "Dados de usuário inválidos.";

    throw new AppError(errorMessage, 400); 
  }


  request.body = result.data;
  return next();
}

module.exports = { validateUserBody, createUserSchema };
