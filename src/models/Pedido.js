import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Usuario from "./Usuario.js";
import Instructores from "./Instructores.js";
import Fichas from "./Fichas.js";
import Producto from "./Productos.js";
import UnidadMedida from "./UnidadesMedidas.js";
import Estado from "./Estados.js";

const Pedido = conexion.define(
    "Pedido",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        cantidadSolicitada:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidadSolicitadaVolumen:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        unidadMedidaSolicitadaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UnidadMedida,
                key: 'id',
            }
        },
        cantidadEntregada:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cantidadEntregadaVolumen:{
            type: DataTypes.FLOAT, 
            allowNull: false,
        },
        unidadMedidaEntregadaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: UnidadMedida,
                key: 'id',
            }
        },
        fechaPedido:{
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Pedidos",
        timestamps: true,
    }
);

// Relaciones con otras tablas
Pedido.belongsTo(Usuario, {foreignKey: "UsuarioId"});
Pedido.belongsTo(Instructores, {foreignKey: "InstructorId"});
Pedido.belongsTo(Fichas, {foreignKey: "fichaId"});
Pedido.belongsTo(Producto, {foreignKey: "ProductoId"});
Pedido.belongsTo(Estado, {foreignKey: "EstadoId"});

// Relaciones específicas para las unidades de medida
Pedido.belongsTo(UnidadMedida, {as: 'UnidadMedidaSolicitada', foreignKey: 'unidadMedidaSolicitadaId'});
Pedido.belongsTo(UnidadMedida, {as: 'UnidadMedidaEntregada', foreignKey: 'unidadMedidaEntregadaId'});

// Hook para establecer el código antes de crear el pedido
Pedido.addHook('beforeCreate', async (pedido, options) => {
    const producto = await Producto.findByPk(pedido.ProductoId);
    if (producto) {
        pedido.codigo = producto.codigo;
    } else {
        throw new Error('Producto no encontrado');
    }
});

// Hook para establecer el código antes de actualizar el pedido
Pedido.addHook('beforeUpdate', async (pedido, options) => {
    if (pedido.ProductoId) {
        const producto = await Producto.findByPk(pedido.ProductoId);
        if (producto) {
            pedido.codigo = producto.codigo;
        } else {
            throw new Error('Producto no encontrado');
        }
    }
});

export default Pedido;
