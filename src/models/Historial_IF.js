import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Fichas from "./Fichas.js";
import Instructores from "./Instructores.js";

const Historial_IF = conexion.define(
  "Historial_IF",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    FichaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "No puedes dejar este campo vacio",
        },
      },
    },
    InstructorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "No puedes dejar este campo vacio",
        },
      },
    },
    Trimestre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "No puedes dejare este campo vacio",
        },
      },
    },
    Fecha_carga: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Historial_IF",
    timestamps: false,
    indexes: [
      {
        fields: ["FichaId", "InstructorId", "Trimestre"],
      },
    ],
  }
);

Historial_IF.belongsTo(Fichas, { foreignKey: "FichasId" });
Historial_IF.belongsTo(Instructores, { foreignKey: "InstructoresId" });
Fichas.hasMany(Historial_IF, { foreignKey: "FichasId" });
Instructores.hasMany(Historial_IF, { foreignKey: "InstructoresId" });


export default Historial_IF;
 