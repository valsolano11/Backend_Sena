import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";

const Permiso = conexion.define(
    "Permiso",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        permisoName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Para asegurar que no se puedan repetir los permisos
        },
    },
    {
        tableName: "Permisos",
        timestamps: true,
    }
);

const insertarPermisos = async(datos) => {
    try {
        await Permiso.sync();
        const respuesta = await Permiso.findAll();

        if (respuesta.length === 0) {
            await Permiso.bulkCreate(datos);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

// Datos predefinidos para los permisos
const datosPermisos = [
    
];

// Insertar los estados al inicio si la tabla está vacía
insertarEstados(datosPermisos);

export default Permiso;

