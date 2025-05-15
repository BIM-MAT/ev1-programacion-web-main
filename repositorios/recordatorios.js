// repositorios/recordatorios.js
import prisma from "../prisma/client.js";

export function obtenerTodos(usuarioId) {
  return prisma.recordatorio.findMany({
    where: { usuarioId },
    orderBy: [
      { important: "desc" },
      { createdAt: "asc" },
    ],
  });
}

export function obtenerUno(usuarioId, id) {
  return prisma.recordatorio.findFirst({
    where: { id, usuarioId },
  });
}

export function crear(usuarioId, { content, important }) {
  return prisma.recordatorio.create({
    data: {
      content,
      important,
      usuarioId,
    },
  });
}

export function actualizar(usuarioId, id, data) {
  return prisma.recordatorio.updateMany({
    where: { id, usuarioId },
    data,
  }).then(result => result.count > 0 ? obtenerUno(usuarioId, id) : null);
}

export function eliminar(usuarioId, id) {
  return prisma.recordatorio.deleteMany({
    where: { id, usuarioId },
  }).then(result => result.count > 0);
}
