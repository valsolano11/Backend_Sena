import convert from 'convert-units';
import unidades from '../variables.js'; 


function encontrarUnidad(sigla) {
    return unidades.find(unidad => unidad.sigla === sigla);
}

// Función para convertir un valor de una unidad a otra utilizando convert-units
function convertirValor(valor, unidadOrigen, unidadDestino) {
    const unidadOrigenObj = encontrarUnidad(unidadOrigen);
    const unidadDestinoObj = encontrarUnidad(unidadDestino);

    if (!unidadOrigenObj || !unidadDestinoObj) {
        throw new Error('Una de las unidades no es válida');
    }

    // Usar convert-units para la conversión
    try {
        // Primero convertir a la unidad base, si es necesario
        const valorEnBase = valor * unidadOrigenObj.equivalencia;

        // Luego convertir desde la unidad base a la unidad destino
        const valorConvertido = convert(valorEnBase)
            .from(unidadOrigen)
            .to(unidadDestino);
        
        return valorConvertido / unidadDestinoObj.equivalencia;
    } catch (error) {
        console.error(`Error en la conversión: ${error.message}`);
        throw error;
    }
}

// Ejemplo de uso
try {
    const valorConvertido = convertirValor(100, 'cm', 'm');
    console.log(`100 cm son ${valorConvertido} m`);
} catch (error) {
    console.error(error.message);
}
