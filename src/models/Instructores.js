import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Estado from "./Estados.js";
import Usuario from "./Usuario.js";


const Instructores = conexion.define(
  "Instructores",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "No puedes dejar este campo vacio",
        },
      },
    },
    correo: {
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
    tableName: "Instructores",
    timestamps: true,
  }
);
Instructores.belongsTo(Estado, { foreignKey: "EstadoId"});
Instructores.belongsTo(Usuario, {foreignKey: "UsuarioId"})


export default Instructores