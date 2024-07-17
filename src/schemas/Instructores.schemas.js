import { z } from "zod";

export const InstructoresSchemas = z.object({
  nombre: z.string({
    required_error: "El nombre del instructor es necesario",
  }),
  correo: z.string({
    required_error: "El correo sena del instructor es necesario",
  }),
  EstadoId: z.number({
    required_error: "El estado del instructor es necesario",
  }),

  UsuarioId: z.number({
    required_error: "El usuario que lo creo es requerido"
  })
});
