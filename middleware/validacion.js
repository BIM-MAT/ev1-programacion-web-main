// middleware/validacion.js
import { parse } from "valibot";

export function validar(esquema) {
  return (req, res, next) => {
    try {
      parse(esquema, req.body);
      next();
    } catch (error) {
      const errores = error.issues?.map((e) => e.message) ?? ["Entrada inválida"];
      res.status(400).json({ error: errores.join(", ") });
    }
  };
}
