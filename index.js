import express from "express";
import authRoutes from "./rutas/auth.js";
import recordatoriosRoutes from "./rutas/recordatorios.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/api/reminders", recordatoriosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
export default app