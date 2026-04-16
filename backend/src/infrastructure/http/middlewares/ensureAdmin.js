function ensureAdmin(request, response, next) {
  const { role } = request.user;

  if (role !== "admin") {
    return response
      .status(403)
      .json({ error: "Acesso negado. Requer privilégios de administrador." });
  }

  return next();
}

module.exports = ensureAdmin;
