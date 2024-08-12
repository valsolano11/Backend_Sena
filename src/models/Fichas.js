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
      unique: true,
      validate: {
        notEmpty: {
          msg: "No puedes dejar este campo vacio",
        },
      },
    },
    Programa: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puedes dejar este campo vacio",
        },
      },
    },
    Jornada: {
      type: DataTypes.ENUM("MAÑANA", "TARDE", "NOCHE"),
      allowNull: false,
      defaultValue: "MAÑANA",  // Usar valor correcto de la enumeración
      validate: {
          notEmpty: {
              msg: "La condición de la ficha no puede estar vacía"
          },
          isIn: {
              args: [["MAÑANA", "TARDE", "NOCHE"]],
              msg: "La condición debe ser 'MAÑANA', 'TARDE' o 'NOCHE'"
          }
      }
    },
  },
  {
    tableName: "Fichas",
    timestamps: true,
    indexes: [
      {
        fields: ["NumeroFicha"],
      },
    ],
  }
);

Fichas.belongsTo(Estado, { foreignKey: "EstadoId" });
Fichas.belongsTo(Usuario, { foreignKey: "UsuarioId" });

export default Fichas;