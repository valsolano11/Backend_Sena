import { z } from "zod";

export const FichaSchemas = z.object({
  NumeroFicha: z.string({
    required_error: "El numero de ficha es requerido",
  }),
  EstadoId: z.string({
    required_error: "Es necesario colocar un estado",
  }),
  UsuarioId: z.string({
    required_error: "El usuario que va registrarlo es requerido",
  }),
 
});
