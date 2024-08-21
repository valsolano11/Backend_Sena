import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Usuario from "./Usuario.js";
import Estado from "./Estados.js";
import Subcategoria from "./Subcategoria.js";
import UnidadMedida from "./UnidadesMedidas.js";


const Producto = conexion.define(
    "Producto",
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
            unique: true, 
            validate: {
                notEmpty: {
                    msg: "El nombre del producto no puede estar vacío"
                },
            },
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: {
                    msg: "El codigo del producto no puede estar vacío"
                },
            },
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La descripcion del producto no puede estar vacío"
                },
            },
        },
        cantidadEntrada: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidadSalida: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidadActual: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },  
        marca:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "La marca del producto no puede estar vacío"
                },
            },
        },
    },
    {
        tableName: "Productos",
        timestamps: true,
    }
)

Producto.belongsTo(Usuario, {foreignKey: "UsuarioId"});
Producto.belongsTo(Estado, {foreignKey: "EstadoId"});
Producto.belongsTo(Subcategoria, {foreignKey: "SubcategoriaId"});
Producto.belongsTo(UnidadMedida, { foreignKey: 'unidadMedidaId' });

export default Producto;

