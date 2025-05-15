// middleware/auth.js
import { obtenerUsuarioPorToken } from "../repositorios/usuarios.js";

export async function authMiddleware(req, res, next) {
  const token = req.header("X-Authorization");
  if (!token) return res.status(401).json({ error: "Token faltante" });

  const usuario = await obtenerUsuarioPorToken(token);
  if (!usuario) return res.status(401).json({ error: "Token inválido" });

  req.user = usuario;
  next();
}
