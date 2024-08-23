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



const guardarRoles = async () => {
  try {
    await Rol.sync();
    const roles = await Rol.findAll();
    if (roles.length === 0) {
      await Rol.bulkCreate(dataRoles);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
setTimeout(() => {
  guardarRoles();
}, 2500);

const dataRoles = [
  {rolName: 'ADMIN'},
  {rolName: 'USUARIO'},
  {rolName: 'SUBADMINISTRADOR'},
]

export default Rol;
