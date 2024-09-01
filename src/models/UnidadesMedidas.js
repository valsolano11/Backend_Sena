import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";


const UnidadDeMedida = conexion.define(
    'UnidadDeMedida', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El tipo no puede estar vacío",
                },
            },
        },
        sigla: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La sigla no puede estar vacía",
                },
            },
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El nombre no puede estar vacío",
                },
            },
        },
        equivalencia: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La equivalencia no puede estar vacía",
                },
            },
        },
    }, {
        timestamps: false,
        tableName: 'UnidadesMedidas',
    }
);

const guardarUnidades = async () => {
    try {
        await UnidadDeMedida.sync();
        const unidades = await UnidadDeMedida.findAll();
        if (unidades.length === 0) {
            await UnidadDeMedida.bulkCreate(insertarUnidades);
        }
    } catch (error) {
        throw new Error(error.message);
    }
    };
    setTimeout(() => {
        guardarUnidades();
    }, 2500);
    const insertarUnidades = [

        

        // Cantidad
        { tipo: 'cantidad', sigla: 'ud', nombre: 'Unidad', equivalencia: 1 },
        { tipo: 'cantidad', sigla: 'par', nombre: 'Par', equivalencia: 2 },
        { tipo: 'cantidad', sigla: 'docena', nombre: 'Docena', equivalencia: 12 },
        { tipo: 'cantidad', sigla: 'ciento', nombre: 'Ciento', equivalencia: 100 },
        { tipo: 'cantidad', sigla: 'caja', nombre: 'Caja', equivalencia: 1 }, // Puede variar según el contenido de la caja
        { tipo: 'cantidad', sigla: 'bolsa', nombre: 'Bolsa', equivalencia: 1 }, // Puede variar según el contenido de la bolsa

        // Medidas Especiales
        { tipo: 'unidad', sigla: 'hoja', nombre: 'Hoja/Pieza', equivalencia: 1 }, // Para láminas, madera, metal
        { tipo: 'unidad', sigla: 'rollo', nombre: 'Rollo', equivalencia: 1 }, // Para cables, cintas
        { tipo: 'unidad', sigla: 'paquete', nombre: 'Paquete', equivalencia: 1 }, // Para clavos, tornillos, etc.
        { tipo: 'unidad', sigla: 'carrete', nombre: 'Carrete', equivalencia: 1 }, // Para cables
        { tipo: 'volumen', sigla: 'in³', nombre: 'Pulgadas cúbicas', equivalencia: 0.0163871 }, // Para ciertos productos que requieren precisión

        // Ropa/Accesorios de Protección
        { tipo: 'talla', sigla: 'talla', nombre: 'Talla', equivalencia: 1 }, // Para guantes, botas, etc.

        // Longitud (Length)
        { tipo: "longitud", sigla: "mm", nombre: "Milímetro", equivalencia: 1 / 1000 },
        { tipo: "longitud", sigla: "cm", nombre: "Centímetro", equivalencia: 1 / 100 },
        { tipo: "longitud", sigla: "m", nombre: "Metro", equivalencia: 1 },
        { tipo: "longitud", sigla: "in", nombre: "Pulgada", equivalencia: 0.0254 },
        { tipo: "longitud", sigla: "ft-us", nombre: "Pie (US)", equivalencia: 0.3048 },
        { tipo: "longitud", sigla: "ft", nombre: "Pie", equivalencia: 0.3048 },
        { tipo: "longitud", sigla: "mi", nombre: "Milla", equivalencia: 1609.34 },

        // Área (Area)
        { tipo: "area", sigla: "mm²", nombre: "Milímetro cuadrado", equivalencia: 1e-6 },
        { tipo: "area", sigla: "cm²", nombre: "Centímetro cuadrado", equivalencia: 1e-4 },
        { tipo: "area", sigla: "m²", nombre: "Metro cuadrado", equivalencia: 1 },
        { tipo: "area", sigla: "ha", nombre: "Hectárea", equivalencia: 10000 },
        { tipo: "area", sigla: "km²", nombre: "Kilómetro cuadrado", equivalencia: 1e6 },
        { tipo: "area", sigla: "in²", nombre: "Pulgada cuadrada", equivalencia: 0.00064516 },
        { tipo: "area", sigla: "ft²", nombre: "Pie cuadrado", equivalencia: 0.092903 },
        { tipo: "area", sigla: "ac", nombre: "Acre", equivalencia: 4046.86 },
        { tipo: "area", sigla: "mi²", nombre: "Milla cuadrada", equivalencia: 2.59e6 },

        //Masa (Mass)
        { tipo: "masa", sigla: "mcg", nombre: "Microgramo", equivalencia: 1e-9 },
        { tipo: "masa", sigla: "mg", nombre: "Miligramo", equivalencia: 1e-6 },
        { tipo: "masa", sigla: "g", nombre: "Gramo", equivalencia: 1e-3 },
        { tipo: "masa", sigla: "kg", nombre: "Kilogramo", equivalencia: 1 },
        { tipo: "masa", sigla: "oz", nombre: "Onza", equivalencia: 0.0283495 },
        { tipo: "masa", sigla: "lb", nombre: "Libra", equivalencia: 0.453592 },
        { tipo: "masa", sigla: "mt", nombre: "Métrica tonelada", equivalencia: 1000 },
        { tipo: "masa", sigla: "t", nombre: "Tonelada", equivalencia: 1000 },

        //Volumen (Volume)
        { tipo: "volumen", sigla: "mm³", nombre: "Milímetro cúbico", equivalencia: 1e-9 },
        { tipo: "volumen", sigla: "cm³", nombre: "Centímetro cúbico", equivalencia: 1e-6 },
        { tipo: "volumen", sigla: "ml", nombre: "Mililitro", equivalencia: 1e-6 },
        { tipo: "volumen", sigla: "l", nombre: "Litro", equivalencia: 1e-3 },
        { tipo: "volumen", sigla: "kl", nombre: "Kilolitro", equivalencia: 1 },
        { tipo: "volumen", sigla: "m³", nombre: "Metro cúbico", equivalencia: 1 },
        { tipo: "volumen", sigla: "km³", nombre: "Kilómetro cúbico", equivalencia: 1e9 },
        { tipo: "volumen", sigla: "tsp", nombre: "Cucharadita", equivalencia: 4.92892e-3 },
        { tipo: "volumen", sigla: "Tbs", nombre: "Cucharada", equivalencia: 1.47868e-2 },
        { tipo: "volumen", sigla: "in³", nombre: "Pulgada cúbica", equivalencia: 1.63871e-5 },
        { tipo: "volumen", sigla: "fl-oz", nombre: "Onza líquida", equivalencia: 2.95735e-5 },
        { tipo: "volumen", sigla: "cup", nombre: "Taza", equivalencia: 0.236588 },
        { tipo: "volumen", sigla: "pnt", nombre: "Pinta", equivalencia: 0.473176 },
        { tipo: "volumen", sigla: "qt", nombre: "Cuarto de galón", equivalencia: 0.946353 },
        { tipo: "volumen", sigla: "gal", nombre: "Galón", equivalencia: 3.78541 },
        { tipo: "volumen", sigla: "ft³", nombre: "Pie cúbico", equivalencia: 0.0283168 },
        { tipo: "volumen", sigla: "yd³", nombre: "Yarda cúbica", equivalencia: 0.764555 },

        //Temperatura (Temperature)
        { tipo: "temperatura", sigla: "C", nombre: "Celsius", equivalencia: 1 },
        { tipo: "temperatura", sigla: "F", nombre: "Fahrenheit", equivalencia: 1 },
        { tipo: "temperatura", sigla: "K", nombre: "Kelvin", equivalencia: 1 },
        { tipo: "temperatura", sigla: "R", nombre: "Rankine", equivalencia: 1 },

        //Tiempo (Time)
        { tipo: "tiempo", sigla: "ns", nombre: "Nanosegundo", equivalencia: 1e-9 },
        { tipo: "tiempo", sigla: "mu", nombre: "Microsegundo", equivalencia: 1e-6 },
        { tipo: "tiempo", sigla: "ms", nombre: "Milisegundo", equivalencia: 1e-3 },
        { tipo: "tiempo", sigla: "s", nombre: "Segundo", equivalencia: 1 },
        { tipo: "tiempo", sigla: "min", nombre: "Minuto", equivalencia: 60 },
        { tipo: "tiempo", sigla: "h", nombre: "Hora", equivalencia: 3600 },
        { tipo: "tiempo", sigla: "d", nombre: "Día", equivalencia: 86400 },
        { tipo: "tiempo", sigla: "week", nombre: "Semana", equivalencia: 604800 },
        { tipo: "tiempo", sigla: "month", nombre: "Mes", equivalencia: 2.628e6 },
        { tipo: "tiempo", sigla: "year", nombre: "Año", equivalencia: 3.154e7 },

        //Velocidad (Speed)
        { tipo: "velocidad", sigla: "m/s", nombre: "Metro por segundo", equivalencia: 1 },
        { tipo: "velocidad", sigla: "km/h", nombre: "Kilómetro por hora", equivalencia: 0.277778 },
        { tipo: "velocidad", sigla: "m/h", nombre: "Metro por hora", equivalencia: 0.000277778 },
        { tipo: "velocidad", sigla: "knot", nombre: "Nudo", equivalencia: 0.514444 },
        { tipo: "velocidad", sigla: "ft/s", nombre: "Pie por segundo", equivalencia: 0.3048 },
        
        //Presión (Pressure)
        { tipo: "presion", sigla: "Pa", nombre: "Pascal", equivalencia: 1 },
        { tipo: "presion", sigla: "hPa", nombre: "Hectopascal", equivalencia: 100 },
        { tipo: "presion", sigla: "kPa", nombre: "Kilopascal", equivalencia: 1e3 },
        { tipo: "presion", sigla: "MPa", nombre: "Megapascal", equivalencia: 1e6 },
        { tipo: "presion", sigla: "bar", nombre: "Bar", equivalencia: 1e5 },
        { tipo: "presion", sigla: "torr", nombre: "Torr", equivalencia: 133.322 },
        { tipo: "presion", sigla: "psi", nombre: "Libra por pulgada cuadrada", equivalencia: 6894.76 },

        //Digital (Digital)
        { tipo: "digital", sigla: "b", nombre: "Bit", equivalencia: 1 / 8 },
        { tipo: "digital", sigla: "Kb", nombre: "Kilobit", equivalencia: 125 },
        { tipo: "digital", sigla: "Mb", nombre: "Megabit", equivalencia: 125000 },
        { tipo: "digital", sigla: "Gb", nombre: "Gigabit", equivalencia: 1.25e8 },
        { tipo: "digital", sigla: "Tb", nombre: "Terabit", equivalencia: 1.25e11 },
        { tipo: "digital", sigla: "B", nombre: "Byte", equivalencia: 1 },
        { tipo: "digital", sigla: "KB", nombre: "Kilobyte", equivalencia: 1024 },
        { tipo: "digital", sigla: "MB", nombre: "Megabyte", equivalencia: 1.049e6 },
        { tipo: "digital", sigla: "GB", nombre: "Gigabyte", equivalencia: 1.074e9 },
        { tipo: "digital", sigla: "TB", nombre: "Terabyte", equivalencia: 1.1e12 },

        //Ángulo (Angle)
        { tipo: "angulo", sigla: "rad", nombre: "Radian", equivalencia: 1 },
        { tipo: "angulo", sigla: "deg", nombre: "Grado", equivalencia: 0.0174533 },
        { tipo: "angulo", sigla: "grad", nombre: "Grado centesimal", equivalencia: 0.0157079 },
        { tipo: "angulo", sigla: "gon", nombre: "Gonio", equivalencia: 0.0157079 },



];

export default UnidadDeMedida;
