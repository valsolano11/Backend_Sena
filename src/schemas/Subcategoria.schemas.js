import { z } from "zod";

export const SubcategoriaSchema = z.object({
    subcategoriaName: z.string({
        required_error: "La subcategoria  es requerido",
    }),
});