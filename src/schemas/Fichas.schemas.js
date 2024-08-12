import { z } from "zod";

export const FichaSchemas = z.object({
  NumeroFicha: z.string({
    required_error: "El numero de ficha es requerido",
  }),
  EstadoId: z.number({
    required_error: "Es necesario colocar un estado",
  }),

  Programa: z.string({
    required_error: "El programa es requerido",
  }),
  Jornada:  z.enum(["MAÑANA", "TARDE", "NOCHE"], {
    required_error: "La jornada de la ficha es requerida",
    invalid_type_error: "La jornada debe ser 'MAÑANA', 'TARDE' o 'NOCHE'"
  }),
});
