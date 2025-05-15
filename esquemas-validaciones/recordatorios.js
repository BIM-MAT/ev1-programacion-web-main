// esquemas-validaciones/recordatorios.js
import { object, string, boolean, minLength, maxLength, optional } from "valibot";

export const esquemaCrearRecordatorio = object({
  content: string([
    minLength(1, "El contenido no puede estar vacío"),
    maxLength(120, "Máximo 120 caracteres"),
  ]),
  important: optional(boolean()),
});

export const esquemaActualizarRecordatorio = object({
  content: optional(string([
    minLength(1, "El contenido no puede estar vacío"),
    maxLength(120, "Máximo 120 caracteres"),
  ])),
  important: optional(boolean()),
});
