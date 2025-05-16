// controladores/recordatorios.js
import {
  obtenerTodos,
  crear,
  actualizar,
  eliminar,
  obtenerUno,
} from "../repositorios/recordatorios.js";

export async function listarRecordatorios(req, res) {
  try {
    const recordatorios = await obtenerTodos(req.user.id);
    res.status(200).json(recordatorios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener recordatorios" });
  }
}

export async function obtenerRecordatorio(req, res) {
  try {
    const recordatorio = await obtenerUno(req.user.id, req.params.id);
    if (!recordatorio) {
      return res.status(404).json({ error: "Recordatorio no encontrado" });
    }
    res.status(200).json(recordatorio);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el recordatorio" });
  }
}

export async function crearRecordatorio(req, res) {
  try {
    const nuevo = await crear(req.user.id, req.body);
    nuevo.createdAt= Date.parse(nuevo.createdAt)
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear recordatorio" });
  }
}

export async function actualizarRecordatorio(req, res) {
  try {
    const actualizado = await actualizar(req.user.id, req.params.id, req.body);
    if (!actualizado) {
      return res.status(404).json({ error: "Recordatorio no encontrado" });
    }
    actualizado.createdAt= Date.parse(actualizado.createdAt)
    res.status(200).json(actualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar recordatorio" });
  }
}

export async function eliminarRecordatorio(req, res) {
  try {
    const eliminado = await eliminar(req.user.id, req.params.id);
    if (!eliminado) {
      return res.status(404).json({ error: "Recordatorio no encontrado" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar recordatorio" });
  }
}
