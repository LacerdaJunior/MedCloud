const { z } = require("zod");
const AppError = require("../../../errors/AppError");

const updateProfileSchema = z
  .object({
    newName: z
      .string()
      .min(3, "O nome de usuário deve conter ao menos 3 caractéres")
      .optional(),
    newEmail: z.string().email("O email deve conter @").optional(),
    oldPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(6, "A senha deve conter no minímo 6 caractéres")
      .optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.oldPassword) {
        return false;
      }

      return true;
    },

    {
      message: "Você precisa informar a senha antiga para definir uma nova",
      path: ["oldPassword"],
    },
  );

function validateUpdateProfileSchema(request, response, next) {
  const result = updateProfileSchema.safeParse(request.body);

  if (!result.success) {
    const flatErrors = result.error.flatten();
    const firstKey = Object.keys(flatErrors.fieldErrors)[0];
    const errorMessage = firstKey
      ? flatErrors.fieldErrors[firstKey][0]
      : "Dados para atualização de perfil inválidos";
    throw new AppError(errorMessage, 400);
  }

  request.body = result.data;
  return next();
}

module.exports = { validateUpdateProfileSchema, updateProfileSchema };
