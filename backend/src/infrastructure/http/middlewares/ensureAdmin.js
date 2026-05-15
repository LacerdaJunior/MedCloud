const AppError = require("../../../errors/AppError");

function ensureAdmin(request, response, next) {
  const { role } = request.user;

  if (role !== "admin") {
    throw new AppError(
      "Acesso negado. Requer privilégios de administrador.",
      403,
    );
  }

  return next();
}

module.exports = ensureAdmin;
