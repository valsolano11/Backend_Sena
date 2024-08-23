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

/* 
Herramientas Manuales       (martillos, destornilladores, llaves)
Herramientas Eléctricas     (taladros, sierras eléctricas, amoladoras)
Materiales de Construcción  (cemento, arena, ladrillos)
Pinturas y Accesorios       (pinturas, brochas, rodillos)
Iluminación                 (bombillas, lámparas, linternas)
Fontanería                  (tuberías, grifos, conexiones)
Electricidad                (cables, enchufes, interruptores)
Ferretería General          (clavos, tornillos, pernos)
Seguridad y Protección      (cascos, guantes, botas de seguridad)
Jardinería                  (tijeras de podar, mangueras, abonos)
Cerrajería                  (cerraduras, llaves, candados)
Adhesivos y Selladores      (silicona, pegamento, cintas adhesivas)
Carpintería                 (tablas, bisagras, barnices)
Herramientas de Medición    (cintas métricas, niveles, calibres)
Tubería y Accesorios        (codos, conexiones, válvulas)
Accesorios para Baño        (duchas, inodoros, lavabos)
Automatización y Control    (sensores, termostatos, controles remotos)
Accesorios de Cocina        (fregaderos, grifos, encimeras)
Pisos y Revestimientos      (azulejos, baldosas, laminados)
Sistemas de Riego           (aspersores, temporizadores, bombas de agua) 
*/