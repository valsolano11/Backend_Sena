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
        // Length (Longitud)
        { tipo: "longitud", sigla: "mm", nombre: 'Milímetro', equivalencia: 1 / 1000 },
        { tipo: 'longitud', sigla: 'cm', nombre: 'Centímetro',  equivalencia: 1 / 100 },
        { tipo: 'longitud', sigla: 'm', nombre: 'Metro',  equivalencia: 1 },
        { tipo: 'longitud', sigla: 'in', nombre: 'Pulgada',  equivalencia: 0.0254 },
        { tipo: 'longitud', sigla: 'ft-us', nombre: 'Pie (US)',  equivalencia: 0.3048 },
        { tipo: 'longitud', sigla: 'ft', nombre: 'Pie',  equivalencia: 0.3048 },
        { tipo: 'longitud', sigla: 'mi', nombre: 'Milla',  equivalencia: 1609.34 },
    
        // Area (Área)
        { tipo: 'area', sigla: 'mm²', nombre: 'Milímetro cuadrado',  equivalencia: 1e-6 },
        { tipo: 'area', sigla: 'cm²', nombre: 'Centímetro cuadrado',  equivalencia: 1e-4 },
        { tipo: 'area', sigla: 'm²', nombre: 'Metro cuadrado',  equivalencia: 1 },
        { tipo: 'area', sigla: 'ha', nombre: 'Hectárea',  equivalencia: 10000 },
        { tipo: 'area', sigla: 'km²', nombre: 'Kilómetro cuadrado',  equivalencia: 1e6 },
        { tipo: 'area', sigla: 'in²', nombre: 'Pulgada cuadrada',  equivalencia: 0.00064516 },
        { tipo: 'area', sigla: 'ft²', nombre: 'Pie cuadrado',  equivalencia: 0.092903 },
        { tipo: 'area', sigla: 'ac', nombre: 'Acre',  equivalencia: 4046.86 },
        { tipo: 'area', sigla: 'mi²', nombre: 'Milla cuadrada',  equivalencia: 2.59e6 },
    
        // Mass (Masa)
        { tipo: 'masa', sigla: 'mcg', nombre: 'Microgramo',  equivalencia: 1e-9 },
        { tipo: 'masa', sigla: 'mg', nombre: 'Miligramo',  equivalencia: 1e-6 },
        { tipo: 'masa', sigla: 'g', nombre: 'Gramo',  equivalencia: 1e-3 },
        { tipo: 'masa', sigla: 'kg', nombre: 'Kilogramo',  equivalencia: 1 },
        { tipo: 'masa', sigla: 'oz', nombre: 'Onza',  equivalencia: 0.0283495 },
        { tipo: 'masa', sigla: 'lb', nombre: 'Libra',  equivalencia: 0.453592 },
        { tipo: 'masa', sigla: 'mt', nombre: 'Métrica tonelada',  equivalencia: 1000 },
        { tipo: 'masa', sigla: 't', nombre: 'Tonelada',  equivalencia: 1000 },
    
        // Volume (Volumen)
        { tipo: 'volumen', sigla: 'mm³', nombre: 'Milímetro cúbico',  equivalencia: 1e-9 },
        { tipo: 'volumen', sigla: 'cm³', nombre: 'Centímetro cúbico',  equivalencia: 1e-6 },
        { tipo: 'volumen', sigla: 'ml', nombre: 'Mililitro',  equivalencia: 1e-6 },
        { tipo: 'volumen', sigla: 'l', nombre: 'Litro',  equivalencia: 1e-3 },
        { tipo: 'volumen', sigla: 'kl', nombre: 'Kilolitro',  equivalencia: 1 },
        { tipo: 'volumen', sigla: 'm³', nombre: 'Metro cúbico',  equivalencia: 1 },
        { tipo: 'volumen', sigla: 'km³', nombre: 'Kilómetro cúbico',  equivalencia: 1e9 },
        { tipo: 'volumen', sigla: 'tsp', nombre: 'Cucharadita',  equivalencia: 4.92892e-3 },
        { tipo: 'volumen', sigla: 'Tbs', nombre: 'Cucharada',  equivalencia: 1.47868e-2 },
        { tipo: 'volumen', sigla: 'in³', nombre: 'Pulgada cúbica',  equivalencia: 1.63871e-5 },
        { tipo: 'volumen', sigla: 'fl-oz', nombre: 'Onza líquida',  equivalencia: 2.95735e-5 },
        { tipo: 'volumen', sigla: 'cup', nombre: 'Taza',  equivalencia: 0.236588 },
        { tipo: 'volumen', sigla: 'pnt', nombre: 'Pinta',  equivalencia: 0.473176 },
        { tipo: 'volumen', sigla: 'qt', nombre: 'Cuarto de galón',  equivalencia: 0.946353 },
        { tipo: 'volumen', sigla: 'gal', nombre: 'Galón',  equivalencia: 3.78541 },
        { tipo: 'volumen', sigla: 'ft³', nombre: 'Pie cúbico',  equivalencia: 0.0283168 },
        { tipo: 'volumen', sigla: 'yd³', nombre: 'Yarda cúbica',  equivalencia: 0.764555 },
    
        // Volume Flow Rate (Tasa de flujo de volumen)
        { tipo: 'volumen_flujo', sigla: 'mm³/s', nombre: 'Milímetro cúbico por segundo',  equivalencia: 1e-9 },
        { tipo: 'volumen_flujo', sigla: 'cm³/s', nombre: 'Centímetro cúbico por segundo',  equivalencia: 1e-6 },
        { tipo: 'volumen_flujo', sigla: 'ml/s', nombre: 'Mililitro por segundo',  equivalencia: 1e-6 },
        { tipo: 'volumen_flujo', sigla: 'cl/s', nombre: 'Centilitro por segundo',  equivalencia: 1e-5 },
        { tipo: 'volumen_flujo', sigla: 'dl/s', nombre: 'Decilitro por segundo',  equivalencia: 1e-4 },
        { tipo: 'volumen_flujo', sigla: 'l/s', nombre: 'Litro por segundo',  equivalencia: 1e-3 },
        { tipo: 'volumen_flujo', sigla: 'l/min', nombre: 'Litro por minuto',  equivalencia: 1.66667e-5 },
        { tipo: 'volumen_flujo', sigla: 'l/h', nombre: 'Litro por hora',  equivalencia: 2.77778e-7 },
        { tipo: 'volumen_flujo', sigla: 'kl/s', nombre: 'Kilolitro por segundo',  equivalencia: 1 },
        { tipo: 'volumen_flujo', sigla: 'kl/min', nombre: 'Kilolitro por minuto',  equivalencia: 16.6667 },
        { tipo: 'volumen_flujo', sigla: 'kl/h', nombre: 'Kilolitro por hora',  equivalencia: 0.277778 },
        { tipo: 'volumen_flujo', sigla: 'm³/s', nombre: 'Metro cúbico por segundo',  equivalencia: 1 },
        { tipo: 'volumen_flujo', sigla: 'm³/min', nombre: 'Metro cúbico por minuto',  equivalencia: 16.6667 },
        { tipo: 'volumen_flujo', sigla: 'm³/h', nombre: 'Metro cúbico por hora',  equivalencia: 0.277778 },
        { tipo: 'volumen_flujo', sigla: 'km³/s', nombre: 'Kilómetro cúbico por segundo',  equivalencia: 1e9 },
        { tipo: 'volumen_flujo', sigla: 'tsp/s', nombre: 'Cucharadita por segundo',  equivalencia: 4.92892e-3 },
        { tipo: 'volumen_flujo', sigla: 'Tbs/s', nombre: 'Cucharada por segundo',  equivalencia: 1.47868e-2 },
        { tipo: 'volumen_flujo', sigla: 'in³/s', nombre: 'Pulgada cúbica por segundo',  equivalencia: 1.63871e-5 },
        { tipo: 'volumen_flujo', sigla: 'in³/min', nombre: 'Pulgada cúbica por minuto',  equivalencia: 2.73159e-7 },
        { tipo: 'volumen_flujo', sigla: 'in³/h', nombre: 'Pulgada cúbica por hora',  equivalencia: 4.55265e-9 },
        { tipo: 'volumen_flujo', sigla: 'fl-oz/s', nombre: 'Onza líquida por segundo',  equivalencia: 2.95735e-5 },
        { tipo: 'volumen_flujo', sigla: 'fl-oz/min', nombre: 'Onza líquida por minuto',  equivalencia: 4.92892e-4 },
        { tipo: 'volumen_flujo', sigla: 'fl-oz/h', nombre: 'Onza líquida por hora',  equivalencia: 8.21487e-6 },
        { tipo: 'volumen_flujo', sigla: 'cup/s', nombre: 'Taza por segundo',  equivalencia: 0.236588 },
        { tipo: 'volumen_flujo', sigla: 'pnt/s', nombre: 'Pinta por segundo',  equivalencia: 0.473176 },
        { tipo: 'volumen_flujo', sigla: 'pnt/min', nombre: 'Pinta por minuto',  equivalencia: 7.88627e-3 },
        { tipo: 'volumen_flujo', sigla: 'pnt/h', nombre: 'Pinta por hora',  equivalencia: 1.31438e-4 },
        { tipo: 'volumen_flujo', sigla: 'qt/s', nombre: 'Cuarto de galón por segundo',  equivalencia: 0.946353 },
        { tipo: 'volumen_flujo', sigla: 'gal/s', nombre: 'Galón por segundo',  equivalencia: 3.78541 },
        { tipo: 'volumen_flujo', sigla: 'gal/min', nombre: 'Galón por minuto',  equivalencia: 0.0630902 },
        { tipo: 'volumen_flujo', sigla: 'gal/h', nombre: 'Galón por hora',  equivalencia: 0.0010515 },
        { tipo: 'volumen_flujo', sigla: 'ft³/s', nombre: 'Pie cúbico por segundo',  equivalencia: 0.0283168 },
        { tipo: 'volumen_flujo', sigla: 'ft³/min', nombre: 'Pie cúbico por minuto',  equivalencia: 4.71947e-4 },
        { tipo: 'volumen_flujo', sigla: 'ft³/h', nombre: 'Pie cúbico por hora',  equivalencia: 7.86539e-6 },
        { tipo: 'volumen_flujo', sigla: 'yd³/s', nombre: 'Yarda cúbica por segundo',  equivalencia: 0.764555 },
        { tipo: 'volumen_flujo', sigla: 'yd³/min', nombre: 'Yarda cúbica por minuto',  equivalencia: 12.7426 },
        { tipo: 'volumen_flujo', sigla: 'yd³/h', nombre: 'Yarda cúbica por hora',  equivalencia: 0.212377 },
    
        // Temperature (Temperatura)
        { tipo: 'temperatura', sigla: 'C', nombre: 'Celsius',  equivalencia: 1 },
        { tipo: 'temperatura', sigla: 'F', nombre: 'Fahrenheit',  equivalencia: 1 },
        { tipo: 'temperatura', sigla: 'K', nombre: 'Kelvin',  equivalencia: 1 },
        { tipo: 'temperatura', sigla: 'R', nombre: 'Rankine',  equivalencia: 1 },
    
        // Time (Tiempo)
        { tipo: 'tiempo', sigla: 'ns', nombre: 'Nanosegundo',  equivalencia: 1e-9 },
        { tipo: 'tiempo', sigla: 'mu', nombre: 'Microsegundo',  equivalencia: 1e-6 },
        { tipo: 'tiempo', sigla: 'ms', nombre: 'Milisegundo',  equivalencia: 1e-3 },
        { tipo: 'tiempo', sigla: 's', nombre: 'Segundo',  equivalencia: 1 },
        { tipo: 'tiempo', sigla: 'min', nombre: 'Minuto',  equivalencia: 60 },
        { tipo: 'tiempo', sigla: 'h', nombre: 'Hora',  equivalencia: 3600 },
        { tipo: 'tiempo', sigla: 'd', nombre: 'Día',  equivalencia: 86400 },
        { tipo: 'tiempo', sigla: 'week', nombre: 'Semana',  equivalencia: 604800 },
        { tipo: 'tiempo', sigla: 'month', nombre: 'Mes',  equivalencia: 2.628e6 },
        { tipo: 'tiempo', sigla: 'year', nombre: 'Año',  equivalencia: 3.154e7 },
    
        // Frequency (Frecuencia)
        { tipo: 'frecuencia', sigla: 'Hz', nombre: 'Hercio',  equivalencia: 1 },
        { tipo: 'frecuencia', sigla: 'mHz', nombre: 'Milihercio',  equivalencia: 1e-3 },
        { tipo: 'frecuencia', sigla: 'kHz', nombre: 'Kilohercio',  equivalencia: 1e3 },
        { tipo: 'frecuencia', sigla: 'MHz', nombre: 'Megahercio',  equivalencia: 1e6 },
        { tipo: 'frecuencia', sigla: 'GHz', nombre: 'Gigahercio',  equivalencia: 1e9 },
        { tipo: 'frecuencia', sigla: 'THz', nombre: 'Terahercio',  equivalencia: 1e12 },
        { tipo: 'frecuencia', sigla: 'rpm', nombre: 'Revoluciones por minuto',  equivalencia: 0.0166667 },
        { tipo: 'frecuencia', sigla: 'deg/s', nombre: 'Grados por segundo',  equivalencia: 1 },
        { tipo: 'frecuencia', sigla: 'rad/s', nombre: 'Radianes por segundo',  equivalencia: 1 },
    
        // Speed (Velocidad)
        { tipo: 'velocidad', sigla: 'm/s', nombre: 'Metro por segundo',  equivalencia: 1 },
        { tipo: 'velocidad', sigla: 'km/h', nombre: 'Kilómetro por hora',  equivalencia: 0.277778 },
        { tipo: 'velocidad', sigla: 'm/h', nombre: 'Metro por hora',  equivalencia: 0.000277778 },
        { tipo: 'velocidad', sigla: 'knot', nombre: 'Nudo',  equivalencia: 0.514444 },
        { tipo: 'velocidad', sigla: 'ft/s', nombre: 'Pie por segundo',  equivalencia: 0.3048 },
    
        // Pace (Ritmo)
        { tipo: 'ritmo', sigla: 's/m', nombre: 'Segundos por metro',  equivalencia: 1 },
        { tipo: 'ritmo', sigla: 'min/km', nombre: 'Minutos por kilómetro',  equivalencia: 60 },
        { tipo: 'ritmo', sigla: 's/ft', nombre: 'Segundos por pie',  equivalencia: 3.28084 },
        { tipo: 'ritmo', sigla: 'min/km', nombre: 'Minutos por kilómetro',  equivalencia: 60 },
    
        // Pressure (Presión)
        { tipo: 'presion', sigla: 'Pa', nombre: 'Pascal',  equivalencia: 1 },
        { tipo: 'presion', sigla: 'hPa', nombre: 'Hectopascal',  equivalencia: 100 },
        { tipo: 'presion', sigla: 'kPa', nombre: 'Kilopascal',  equivalencia: 1e3 },
        { tipo: 'presion', sigla: 'MPa', nombre: 'Megapascal',  equivalencia: 1e6 },
        { tipo: 'presion', sigla: 'bar', nombre: 'Bar',  equivalencia: 1e5 },
        { tipo: 'presion', sigla: 'torr', nombre: 'Torr',  equivalencia: 133.322 },
        { tipo: 'presion', sigla: 'psi', nombre: 'Libra por pulgada cuadrada',  equivalencia: 6894.76 },
        { tipo: 'presion', sigla: 'ksi', nombre: 'Kilo-libra por pulgada cuadrada',  equivalencia: 6.89476e6 },
    
        // Digital
        { tipo: 'digital', sigla: 'b', nombre: 'Bit',  equivalencia: 1 },
        { tipo: 'digital', sigla: 'Kb', nombre: 'Kilobit',  equivalencia: 1e3 },
        { tipo: 'digital', sigla: 'Mb', nombre: 'Megabit',  equivalencia: 1e6 },
        { tipo: 'digital', sigla: 'Gb', nombre: 'Gigabit',  equivalencia: 1e9 },
        { tipo: 'digital', sigla: 'Tb', nombre: 'Terabit',  equivalencia: 1e12 },
        { tipo: 'digital', sigla: 'B', nombre: 'Byte',  equivalencia: 8 },
        { tipo: 'digital', sigla: 'KB', nombre: 'Kilobyte',  equivalencia: 8e3 },
        { tipo: 'digital', sigla: 'MB', nombre: 'Megabyte',  equivalencia: 8e6 },
        { tipo: 'digital', sigla: 'GB', nombre: 'Gigabyte',  equivalencia: 8e9 },
        { tipo: 'digital', sigla: 'TB', nombre: 'Terabyte',  equivalencia: 8e12 },
    
        // Illuminance (Iluminancia)
        { tipo: 'iluminancia', sigla: 'lx', nombre: 'Lux',  equivalencia: 1 },
        { tipo: 'iluminancia', sigla: 'ft-cd', nombre: 'Pie-candela',  equivalencia: 10.7639 },
    
        // Parts-Per (Partes por)
        { tipo: 'partes_por', sigla: 'ppm', nombre: 'Partes por millón',  equivalencia: 1e-6 },
        { tipo: 'partes_por', sigla: 'ppb', nombre: 'Partes por billón',  equivalencia: 1e-9 },
        { tipo: 'partes_por', sigla: 'ppt', nombre: 'Partes por trillón',  equivalencia: 1e-12 },
        { tipo: 'partes_por', sigla: 'ppq', nombre: 'Partes por cuatrillón',  equivalencia: 1e-15 },
    
        // Voltage (Voltaje)
        { tipo: 'voltaje', sigla: 'V', nombre: 'Voltio',  equivalencia: 1 },
        { tipo: 'voltaje', sigla: 'mV', nombre: 'Milivoltio',  equivalencia: 1e-3 },
        { tipo: 'voltaje', sigla: 'kV', nombre: 'Kilovoltio',  equivalencia: 1e3 },
    
        // Current (Corriente)
        { tipo: 'corriente', sigla: 'A', nombre: 'Amperio',  equivalencia: 1 },
        { tipo: 'corriente', sigla: 'mA', nombre: 'Miliamperio',  equivalencia: 1e-3 },
        { tipo: 'corriente', sigla: 'kA', nombre: 'Kiloamperio',  equivalencia: 1e3 },
    
        // Power (Potencia)
        { tipo: 'potencia', sigla: 'W', nombre: 'Vatio',  equivalencia: 1 },
        { tipo: 'potencia', sigla: 'mW', nombre: 'Milivatio',  equivalencia: 1e-3 },
        { tipo: 'potencia', sigla: 'kW', nombre: 'Kilovatio',  equivalencia: 1e3 },
        { tipo: 'potencia', sigla: 'MW', nombre: 'Megavatio',  equivalencia: 1e6 },
        { tipo: 'potencia', sigla: 'GW', nombre: 'Gigavatio',  equivalencia: 1e9 },
    
        // Apparent Power (Potencia aparente)
        { tipo: 'potencia_aparente', sigla: 'VA', nombre: 'Voltio-amperio',  equivalencia: 1 },
        { tipo: 'potencia_aparente', sigla: 'mVA', nombre: 'Milivoltio-amperio',  equivalencia: 1e-3 },
        { tipo: 'potencia_aparente', sigla: 'kVA', nombre: 'Kilovoltio-amperio',  equivalencia: 1e3 },
        { tipo: 'potencia_aparente', sigla: 'MVA', nombre: 'Megavoltio-amperio',  equivalencia: 1e6 },
        { tipo: 'potencia_aparente', sigla: 'GVA', nombre: 'Gigavoltio-amperio',  equivalencia: 1e9 },
    
        // Reactive Power (Potencia reactiva)
        { tipo: 'potencia_reactiva', sigla: 'VAR', nombre: 'Voltio-amperio reactivo',  equivalencia: 1 },
        { tipo: 'potencia_reactiva', sigla: 'mVAR', nombre: 'Milivoltio-amperio reactivo',  equivalencia: 1e-3 },
        { tipo: 'potencia_reactiva', sigla: 'kVAR', nombre: 'Kilovoltio-amperio reactivo',  equivalencia: 1e3 },
        { tipo: 'potencia_reactiva', sigla: 'MVAR', nombre: 'Megavoltio-amperio reactivo',  equivalencia: 1e6 },
        { tipo: 'potencia_reactiva', sigla: 'GVAR', nombre: 'Gigavoltio-amperio reactivo',  equivalencia: 1e9 },
    
        // Energy (Energía)
        { tipo: 'energia', sigla: 'Wh', nombre: 'Vatio-hora',  equivalencia: 3600 },
        { tipo: 'energia', sigla: 'mWh', nombre: 'Milivatio-hora',  equivalencia: 3.6 },
        { tipo: 'energia', sigla: 'kWh', nombre: 'Kilovatio-hora',  equivalencia: 3.6e6 },
        { tipo: 'energia', sigla: 'MWh', nombre: 'Megavatio-hora',  equivalencia: 3.6e9 },
        { tipo: 'energia', sigla: 'GWh', nombre: 'Gigavatio-hora',  equivalencia: 3.6e12 },
        { tipo: 'energia', sigla: 'J', nombre: 'Julio',  equivalencia: 1 },
        { tipo: 'energia', sigla: 'kJ', nombre: 'Kilojulio',  equivalencia: 1e3 },
    
        // Temperature (Temperatura)
        { tipo: 'temperatura', sigla: '°C', nombre: 'Celsius',  equivalencia: 1 },
        { tipo: 'temperatura', sigla: '°F', nombre: 'Fahrenheit',  equivalencia: 1.8 },
        { tipo: 'temperatura', sigla: 'K', nombre: 'Kelvin',  equivalencia: 1 },
    
        // Frequency (Frecuencia)
        { tipo: 'frecuencia', sigla: 'Hz', nombre: 'Hercio',  equivalencia: 1 },
        { tipo: 'frecuencia', sigla: 'kHz', nombre: 'Kilohertz',  equivalencia: 1e3 },
        { tipo: 'frecuencia', sigla: 'MHz', nombre: 'Megahertz',  equivalencia: 1e6 },
        { tipo: 'frecuencia', sigla: 'GHz', nombre: 'Gigahertz',  equivalencia: 1e9 },
    
        // Radioactivity (Radiactividad)
        { tipo: 'radiactividad', sigla: 'Bq', nombre: 'Becquerel',  equivalencia: 1 },
        { tipo: 'radiactividad', sigla: 'Ci', nombre: 'Curie',  equivalencia: 3.7e10 },
        { tipo: 'radiactividad', sigla: 'dpm', nombre: 'Desintegraciones por minuto',  equivalencia: 60 },
        { tipo: 'radiactividad', sigla: 'Gy', nombre: 'Gray',  equivalencia: 1 },
        { tipo: 'radiactividad', sigla: 'Sv', nombre: 'Sievert',  equivalencia: 1 },
    
        // Angle (Ángulo)
        { tipo: 'angulo', sigla: '°', nombre: 'Grado',  equivalencia: 1 },
        { tipo: 'angulo', sigla: '\'', nombre: 'Minuto de arco',  equivalencia: 1/60 },
        { tipo: 'angulo', sigla: '"', nombre: 'Segundo de arco',  equivalencia: 1/3600 },
        { tipo: 'angulo', sigla: 'rad', nombre: 'Radián',  equivalencia: 57.2958 },
        { tipo: 'angulo', sigla: 'mrad', nombre: 'Miliradián',  equivalencia: 57.2958/1000 },
        { tipo: 'angulo', sigla: 'grad', nombre: 'Grado centesimal',  equivalencia: 0.9 },
        { tipo: 'angulo', sigla: 'gon', nombre: 'Gon',  equivalencia: 0.9 },
    
        // Force (Fuerza)
        { tipo: 'fuerza', sigla: 'N', nombre: 'Newton',  equivalencia: 1 },
        { tipo: 'fuerza', sigla: 'kN', nombre: 'Kilonewton',  equivalencia: 1e3 },
        { tipo: 'fuerza', sigla: 'lbf', nombre: 'Libra-fuerza',  equivalencia: 4.44822 },
        { tipo: 'fuerza', sigla: 'dyn', nombre: 'Dina',  equivalencia: 1e-5 },
    
        // Torque (Par de torsión)
        { tipo: 'torque', sigla: 'Nm', nombre: 'Newton metro',  equivalencia: 1 },
        { tipo: 'torque', sigla: 'lb-ft', nombre: 'Libra-pie',  equivalencia: 1.35582 },
        { tipo: 'torque', sigla: 'kgf-m', nombre: 'Kilogramo-fuerza metro',  equivalencia: 9.80665 },
        { tipo: 'torque', sigla: 'ozf-in', nombre: 'Onza-fuerza pulgada',  equivalencia: 7.06155 },
    
];

export default UnidadDeMedida;
