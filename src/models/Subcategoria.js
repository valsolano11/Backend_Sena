import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Categoria from "./Categoria.js";
import Estado from "./Estados.js";

const Subcategoria = conexion.define(
    "Subcategoria",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        subcategoriaName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, 
            validate: {
                notEmpty: {
                    msg: "El nombre de la Subcategoria no puede estar vacío"
                },
            },
        },
    },
    {
        tableName: "Subcategorias",
        timestamps: true,
        indexes: [
            {
                fields: ['subcategoriaName', 'CategoriaId', 'EstadoId'],
            },
        ],
    }
);

Subcategoria.belongsTo(Categoria, { foreignKey: "CategoriaId" });
Subcategoria.belongsTo(Estado, { foreignKey: "EstadoId"});

export default Subcategoria;
