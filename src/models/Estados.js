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

const datosEstados = [
  { estadoName: "ACTIVO" },
  { estadoName: "INACTIVO" },
  { estadoName: "AGOTADO" },
  { estadoName: "PENDIENTE" },
  { estadoName: "EN PROCESO" },
  { estadoName: "EN USO" },
  { estadoName: "ENTREGADO" },
  { estadoName: "DEVUELTO" },
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