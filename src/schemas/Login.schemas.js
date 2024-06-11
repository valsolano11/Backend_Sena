import { z } from "zod";

export const loginSchemas = z.object({
  Documento: z.string({
    required_error: "El documento es requerido",
  }),
  password: z.string({
    required_error: "La contraseña es requerida",
  }),
});
