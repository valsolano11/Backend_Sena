import { z } from "zod";

export const usuarioSchemas = z.object({
  Documento: z.string({
    required_error: "El documento es requerido",
  }),
  nombre: z.string({
    required_error: "El nombre es requerido",
  }),
  correo: z.string({
    required_error: "EL correo es requerido",
  }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, "La contraseña debe tener minimo 6 caracteres")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
    .regex(
      /[\W_]/,
      "La contraseña debe contener al menos un carácter especial"
    ),
});
