/* import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Fichas from "./Fichas.js";
import Instructores from "./Instructores.js";

const FichaInstructor = conexion.define(
  "FichaInstructor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    FichaId: {
      type: DataTypes.INTEGER,
      references: {
        model: Fichas,
        key: 'id'
      }
    },
    InstructorId: {
      type: DataTypes.INTEGER,
      references: {
        model: Instructores,
        key: 'id'
      }
    }
  },
  {
    tableName: "FichaInstructor",
    timestamps: true,
  }
);

Fichas.belongsToMany(Instructores, { through: FichaInstructor, foreignKey: 'FichaId' });
Instructores.belongsToMany(Fichas, { through: FichaInstructor, foreignKey: 'InstructorId' });

export default FichaInstructor;
 */