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
      unique: true,
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
    indexes: [
      {
        unique: true,
        fields: ["estadoName"],
      },
    ],
  }
);

// Datos predefinidos para los estados
const datosEstados = [
  { estadoName: "ACTIVO" },
  { estadoName: "INACTIVO" }
];

const guardarEstados = async () => {
  try {
    await Estado.sync({ alter: true }); // Usar 'alter' para ajustar la tabla si hay cambios
    const estados = await Estado.findAll();
    if (estados.length === 0) {
      await Estado.bulkCreate(datosEstados);
    }
  } catch (error) {
    console.error("Error al guardar estados:", error.message);
  }
};

setTimeout(() => {
  guardarEstados();
}, 500); // Ajustar el tiempo de espera a 500 ms

export default Estado;

