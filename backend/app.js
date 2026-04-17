const express = require("express");
const userRoutes = require("./src/infrastructure/http/routes/user.routes");
const sessionRoutes = require("./src/infrastructure/http/routes/session.routes");
const appointmentsRoutes = require("./src/infrastructure/http/routes/appointments.routes");
const AppError = require("./src/errors/AppError");

const app = express();
app.use(express.json());

//----------------------------- ROUTES---------------------------------------------------
app.use("/users", userRoutes);
app.use("/sessions", sessionRoutes);
app.use("/profile", userRoutes);
app.use("/appointments", appointmentsRoutes);

//----------------------------- ---------------------------------------------------------
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error("❌ Erro Crítico:", error);

  return response.status(500).json({
    status: "error",
    message: "Erro interno do servidor",
  });
});
module.exports = app;
