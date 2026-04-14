const jwt = require("jsonwebtoken");

function authMiddleware(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: "token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    request.user = decodedPayload;

    return next();
  } catch (error) {
    return response.status(401).json({ error: "token, inválido ou expirado." });
  }
}

module.exports = authMiddleware;
