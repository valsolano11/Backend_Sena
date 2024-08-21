import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import { defaultVariables } from '../variables.js';

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

// Función para insertar unidades
async function insertDefaultUnidadesMedida(data) {
    try {
        await UnidadDeMedida.sync();
        const respuesta = await UnidadDeMedida.findAll();

        if (respuesta.length === 0) {
            await UnidadDeMedida.bulkCreate(data);
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

insertDefaultUnidadesMedida(defaultVariables.insertarUnidades);

export default UnidadDeMedida;
