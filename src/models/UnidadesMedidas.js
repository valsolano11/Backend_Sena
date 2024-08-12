import { DataTypes } from 'sequelize';
import { conexion } from "../conexion.js";
import { defaultVariables } from '../variables.js';


const UnidadMedida = conexion.define(
    "UnidadMedida",
    {
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
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        tableName: "UnidadesMedida",
        timestamps: true,
    }
);

// Función para insertar unidades
async function insertDefaultUnidadesMedida(data) {
    try {
        await UnidadMedida.sync();
        const respuesta = await UnidadMedida.findAll();

        if (respuesta.length === 0) {
            await UnidadMedida.bulkCreate(data);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

insertDefaultUnidadesMedida(defaultVariables.insertarUnidades);



export default UnidadMedida;
