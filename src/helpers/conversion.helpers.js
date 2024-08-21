import convert from 'convert-units';
import UnidadDeMedida from '../models/UnidadesMedidas.js';

// Función para encontrar una unidad por su ID
async function encontrarUnidadPorId(id) {
    return await UnidadDeMedida.findByPk(id);
}

// Función para convertir un valor de una unidad a otra
function convertirValor(cantidad, fromUnitSigla, toUnitSigla) {
    try {
        return convert(cantidad)
            .from(fromUnitSigla)
            .to(toUnitSigla);
    } catch (error) {
        console.error(`Error en la conversión: ${error.message}`);
        throw error;
    }
}

// Función principal para manejar la extracción de producto y la conversión
export async function manejarExtraccion(cantidad, fromUnitId, toUnitId, cantidadPotes, capacidadPorPote) {
    try {
        const unidadOrigen = await encontrarUnidadPorId(fromUnitId);
        const unidadDestino = await encontrarUnidadPorId(toUnitId);

        if (!unidadOrigen || !unidadDestino) {
            throw new Error('Una de las unidades no es válida');
        }

        // Convertir la cantidad solicitada a la unidad base (en este caso, galones)
        const cantidadConvertida = convertirValor(cantidad, unidadDestino.sigla, unidadOrigen.sigla);

        // Calcular cuánta cantidad queda en un pote después de la extracción
        const cantidadRestanteEnPote = capacidadPorPote - cantidadConvertida;

        // Calcular cuántos potes completos quedan después de la extracción
        let potesRestantes = cantidadPotes;
        if (cantidadRestanteEnPote < 0) {
            potesRestantes -= 1;
        }

        const totalCantidadRestante = (potesRestantes - 1) * capacidadPorPote + Math.max(cantidadRestanteEnPote, 0);

        return {
            mensaje: `Extracción de ${cantidad} ${unidadDestino.sigla} completada.`,
            potesRestantes,
            cantidadRestanteEnPote: cantidadRestanteEnPote > 0 ? cantidadRestanteEnPote : 0,
            totalCantidadRestante
        };
    } catch (error) {
        console.error(`Error en la extracción: ${error.message}`);
        throw error;
    }
}
