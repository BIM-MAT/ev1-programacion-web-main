// repositorios/usuarios.js
import prisma from "../prisma/client.js";
import crypto from "node:crypto";
import { generateToken } from "../utils/token.js";

function hashPassword(password, salt) {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, key) => {
      if (err) reject(err);
      else resolve(key.toString("hex"));
    });
  });
}

export async function loginUsuario(username, password) {
  const usuario = await prisma.usuario.findUnique({
    where: { username },
  });

  if (!usuario) return null;

  const [salt, key] = usuario.password.split(":");
  const hashed = await hashPassword(password, salt);

  if (hashed !== key) return null;

  const token = generateToken();

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { token },
  });

  return {
    username: usuario.username,
    name: usuario.name,
    token,
  };
}

export async function logoutUsuario(token) {
  const usuario = await prisma.usuario.findFirst({
    where: { token },
  });

  if (!usuario) return false;

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { token: null },
  });

  return true;
}

export async function obtenerUsuarioPorToken(token) {
  return prisma.usuario.findFirst({
    where: { token },
  });
}
