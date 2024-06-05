import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";

const Rol = conexion.define(
  "Rol",
  {
    // ID automatico
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    rolName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Roles",
    timestamps: false,
  }
);

const insertarRoles = async (datos) => {
  try {
    await Rol.sync();
    const respuesta = await Rol.findAll();

    if (respuesta.length === 0) {
      await Rol.bulkCreate(datos);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

insertarRoles([{ rolName: "ADMIN" }, { rolName: "USUARIO" }]);

export default Rol;
