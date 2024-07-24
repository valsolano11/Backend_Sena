import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Estado from "./Estados.js";

const Categoria = conexion.define(
  "Categoria",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    categoriaName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Asegurando que los nombres de categorías sean únicos
      validate: {
        notEmpty: {
          msg: "El nombre de la categoria no puede estar vacio",
        },
      },
    },
  },
  {
    tableName: "Categorias",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['categoriaName', 'EstadoId'],
      },
    ],
  }
);

Categoria.belongsTo(Estado, { foreignKey: "EstadoId" });

export default Categoria;
