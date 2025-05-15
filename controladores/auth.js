// controladores/auth.js
import { loginUsuario, logoutUsuario } from "../repositorios/usuarios.js";

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    const usuario = await loginUsuario(username, password);
    if (!usuario) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
}

export async function logout(req, res) {
  const token = req.header("X-Authorization");

  try {
    const result = await logoutUsuario(token);
    if (!result) {
      return res.status(401).json({ error: "Token inválido" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión" });
  }
}
