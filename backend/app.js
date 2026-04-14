const express = require("express");
const userRoutes = require("./src/infrastructure/http/routes/user.routes");
const sessionRoutes = require("./src/infrastructure/http/routes/session.routes");

const app = express();
app.use(express.json());

//----------------------------- ROUTES---------------------------------------------------
app.use("/users", userRoutes);
app.use("/sessions", sessionRoutes);
//----------------------------- -------------------------------------------------------------

module.exports = app;
