const express = require("express");
const userRoutes = require("./infrastructure/http/routes/user.routes");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
