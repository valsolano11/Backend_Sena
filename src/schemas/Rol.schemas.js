import { z } from "zod";

export const rolSchemas = z.object({
  rolName: z.string({
    required_error: "El nombre del Rol es requerido",
  }),
});
