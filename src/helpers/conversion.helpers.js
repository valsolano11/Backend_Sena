import UnidadDeMedida from '../models/UnidadesMedidas.js';
import convert from 'convert-units';


async function encontrarUnidadPorId(id) {
    return await UnidadDeMedida.findByPk(id);
}

// Función para convertir valores entre unidades
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

// Función para manejar la extracción de unidades
export async function manejarExtraccion(cantidad, fromUnitId, toUnitId, cantidadPotes, capacidadPorPote) {
    try {
        const unidadOrigen = await encontrarUnidadPorId(fromUnitId);
        const unidadDestino = await encontrarUnidadPorId(toUnitId);

        if (!unidadOrigen || !unidadDestino) {
            throw new Error('Una de las unidades no es válida');
        }

        const cantidadConvertida = convertirValor(cantidad, unidadDestino.sigla, unidadOrigen.sigla);
        const cantidadTotalDisponible = cantidadPotes * capacidadPorPote;
        const cantidadRestanteTotal = cantidadTotalDisponible - cantidadConvertida;
        const potesRestantes = Math.floor(cantidadRestanteTotal / capacidadPorPote);
        const cantidadRestanteEnPote = cantidadRestanteTotal % capacidadPorPote;
        const cantidadRestanteEnPoteEnDestino = convertirValor(cantidadRestanteEnPote, unidadOrigen.sigla, unidadDestino.sigla);
        const cantidadTotalRestanteEnDestino = convertirValor(cantidadRestanteTotal, unidadOrigen.sigla, unidadDestino.sigla);

        return {
            mensaje: `Extracción de ${cantidad} ${unidadDestino.nombre} completada.`,
            potesRestantes,
            cantidadRestanteEnPote: cantidadRestanteEnPoteEnDestino,
            totalCantidadRestante: cantidadTotalRestanteEnDestino
        };
    } catch (error) {
        console.error(`Error en la extracción: ${error.message}`);
        throw error;
    }
}
























/* 

async function encontrarUnidadPorId(id) {
    return await UnidadDeMedida.findByPk(id);
}

// Función para convertir valores entre unidades
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

// Función para manejar la extracción de unidades basado en volumen
export async function manejarExtraccion(volumen, fromUnitId, toUnitId, volumenTotal) {
    try {
        const unidadOrigen = await encontrarUnidadPorId(fromUnitId);
        const unidadDestino = await encontrarUnidadPorId(toUnitId);

        if (!unidadOrigen || !unidadDestino) {
            throw new Error('Una de las unidades no es válida');
        }

        // Convertir el volumen solicitado a la unidad de medida del producto
        const volumenConvertido = convertirValor(volumen, unidadDestino.sigla, unidadOrigen.sigla);
        const volumenRestanteTotal = volumenTotal - volumenConvertido;

        return {
            mensaje: `Extracción de ${volumen} ${unidadDestino.nombre} completada.`,
            volumenRestanteTotal
        };
    } catch (error) {
        console.error(`Error en la extracción: ${error.message}`);
        throw error;
    }
}

 */