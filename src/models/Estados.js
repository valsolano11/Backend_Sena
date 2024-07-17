import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";

const Estado = conexion.define(
  "Estado",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    estadoName: {
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
    tableName: "Estados",
    timestamps: true,
  }
);

const insertarEstados = async (datos) => {
    try{
        await Estado.sync();
        const respuesta = await Estado.findAll();

        if(respuesta.length === 0){
            await Estado.bulkCreate(datos);
            /* console.log("Estados insertados correctamente"); */
        }
    }catch(error){
        throw new Error(error.message);
    }
};

// Datos predefinidos para los estados
const datosEstados = [
        { estadoName: "ACTIVO" },
        { estadoName: "INACTIVO" }
    ];

  // Insertar los estados al inicio si la tabla está vacía
insertarEstados(datosEstados);

export default Estado;