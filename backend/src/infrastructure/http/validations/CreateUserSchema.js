const { z } = require("zod");
const AppError = require("../../../errors/AppError");

const createUserSchema = z.object({
  name: z.string().min(3, "O nome deve conter no mínimo 3 caractéres"),
  email: z.string().email("O formato do e-mail é inválido"),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caractéres"),
  
});

function validateCreateUserBody(request, response, next) {
  
    throw new AppError(errorMessage, 400);
  }

  request.body = result.data;
  return next();
}

module.exports = { validateCreateUserBody, createUserSchema };
