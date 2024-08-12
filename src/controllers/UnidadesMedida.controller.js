
import UnidadMedida from './../models/UnidadesMedidas.js';

const conversionRates = {
    // Unidades de volumen
    ml: { gal: 0.000264172, l: 0.001, cc: 1 },
    gal: { ml: 3785.41, l: 3.78541 },
    cc: { ml: 1, gal: 0.000264172, l: 0.001 },
    l: { ml: 1000, gal: 0.264172, cc: 1000 },

    // Unidades de masa
    kg: { g: 1000, lb: 2.20462, oz: 35.274 },
    g: { kg: 0.001, lb: 0.00220462, oz: 0.035274 },
    lb: { kg: 0.453592, g: 453.592, oz: 16 },
    oz: { kg: 0.0283495, g: 28.3495, lb: 0.0625 },

    // Unidades de longitud
    m: { cm: 100, mm: 1000, in: 39.3701, ft: 3.28084 },
    cm: { m: 0.01, mm: 10, in: 0.393701, ft: 0.0328084 },
    mm: { m: 0.001, cm: 0.1, in: 0.0393701, ft: 0.00328084 },
    in: { m: 0.0254, cm: 2.54, mm: 25.4, ft: 0.0833333 },
    ft: { m: 0.3048, cm: 30.48, mm: 304.8, in: 12 },

    // Unidades de temperatura
    C: { F: (value) => (value * 9 / 5) + 32, K: (value) => value + 273.15 },
    F: { C: (value) => (value - 32) * 5 / 9, K: (value) => ((value - 32) * 5 / 9) + 273.15 },
    K: { C: (value) => value - 273.15, F: (value) => ((value - 273.15) * 9 / 5) + 32 },
};


export const getAllUnits = async (req, res) => {
    try {
        const units = await UnidadMedida.findAll();
        res.json(units);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getUnitById = async (req, res) => {
    const { id } = req.params;
    try {
        const unit = await UnidadMedida.findByPk(id);
        if (!unit) {
            return res.status(404).json({ message: "Unidad no encontrada" });
        }
        res.json(unit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Función para convertir unidades
export const convertUnits = (fromUnit, toUnit, value) => {
    if (conversionRates[fromUnit] && conversionRates[fromUnit][toUnit]) {
        const conversion = conversionRates[fromUnit][toUnit];
        return typeof conversion === 'function' ? conversion(value) : value * conversion;
    } else {
        throw new Error('Conversión no soportada');
    }
};


export const handleConversion = (req, res) => {
    const { fromUnit, toUnit, value } = req.body;
    try {
        const result = convertUnits(fromUnit, toUnit, value);
        res.json({ result });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
