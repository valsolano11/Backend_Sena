import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";

const Estado = conexion.define(
  "Estado",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    estadoName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puedes dejar este campo vacio",
        },
      },
    },
  },
  {
    tableName: "Estados",
    timestamps: true,
  }
);
// Datos predefinidos para los estados
const datosEstados = [
        { estadoName: "ACTIVO" },
        { estadoName: "INACTIVO" }
    ];

const guardarEstados = async () => {
  try {
    await Estado.sync();
    const estados = await Estado.findAll();
    if (estados.length === 0) {
      await Estado.bulkCreate(datosEstados);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
setTimeout(() => {
  guardarEstados();
}, 2500);

export default Estado;