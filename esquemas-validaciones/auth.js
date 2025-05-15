// esquemas-validaciones/auth.js
import { object, string, minLength } from "valibot";

export const esquemaLogin = object({
  username: string([minLength(1, "El username es obligatorio")]),
  password: string([minLength(1, "El password es obligatorio")]),
});
