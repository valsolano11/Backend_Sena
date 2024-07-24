import {z} from 'zod';

export const CategoriaSchema = z.object({
    categoriaName: z.string({
        required_error: "El numero de ficha es requerido",
    }),
});