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
      unique: true,
      validate: {
        notEmpty: {
          msg: "El valor no puede estar vacio",
        },
      },
    },
  },
  {
    tableName: "Roles",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["rolName"],
      },
    ],
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
