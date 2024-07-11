import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Estado from "./Estados.js";
import Usuario from "./Usuario.js";

const Fichas = conexion.define(
  "Fichas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    NumeroFicha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EstadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UsuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Usuarios",
        key: "id",
      },
    },
  },
  {
    tableName: "Fichas",
    timestamps: true,
  }
);

Fichas.belongsTo(Estado, { foreignKey: "EstadoId" });
Fichas.belongsTo(Usuario, { foreignKey: "UsuarioId" });

export default Fichas;