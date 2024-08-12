import { DataTypes } from 'sequelize';
import { conexion } from "../conexion.js";
import { defaultVariables } from "../variables.js";

const Rol = conexion.define(
    "Rol",
    {
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
    }
);



async function insertDefaultRoles(dataRoles) {
  try {
    await Rol.sync();
    const respuesta = await Rol.findAll();

    if (respuesta.length === 0) {
      await Rol.bulkCreate(dataRoles);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

insertDefaultRoles(defaultVariables.roles);

export default Rol;
