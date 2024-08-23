import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Herramienta from "./Herramientas.js";
import Usuario from "./Usuario.js";
import Instructores from "./Instructores.js";
import Fichas from "./Fichas.js";
import Estado from "./Estados.js";

const Prestamo = conexion.define(
    "Prestamo",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        observaciones: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        FechaPrestamo: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        FechaDevolucion: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "Prestamos",
        timestamps: true,
    }
);

Prestamo.belongsTo(Usuario, { foreignKey: "UsuarioId" });
Prestamo.belongsTo(Instructores, { foreignKey: "InstructorId" });
Prestamo.belongsTo(Fichas, { foreignKey: "fichaId" });
Prestamo.belongsTo(Herramienta, { foreignKey: "HerramientaId" });
Prestamo.belongsTo(Estado, {foreignKey: "EstadoId"});

export default Prestamo;
