import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import { config } from "dotenv";

config()

const ExcelFile = conexion.define(
  "ExcelFile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploadDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    tableName: "ExcelFiles",
    timestamps: false,
  }
);

export default ExcelFile;
