import { DataTypes } from "sequelize";
import { conexion } from "../conexion.js";
import Rol from "./Rol.js";
import Estado from "./Estados.js";
import { config } from "dotenv";
import bcrypt from "bcryptjs";

config();

const Usuario = conexion.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "No puedes dejar este campo vacio",
        },
      },
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "No puedes dejar este campo vacio",
        },
      },
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "No puedes dejar este campo vacio",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "No puedes dejar este campo vacio",
        },
      },
    },
  },
  {
    tableName: "Usuarios",
    timestamps: true,
    indexes: [
      {
        fields: [
          "Documento",
          "nombre",
          "correo",
          "password",
          "EstadoId",
          "RolId",
        ],
      },
    ],
  }
);
// Relacion de los roles y el estado 

Usuario.belongsTo(Estado, { foreignKey: "EstadoId" });
Usuario.belongsTo(Rol, { foreignKey: "RolId" });


//encriptacion de contraseñas
var salt = bcrypt.genSaltSync(10);
var hashPass = bcrypt.hashSync(process.env.PASSWORD_ADMIN, salt);

const master = {
  Documento: process.env.DOCUMENT_ADMIN,
  nombre: "Administrador sena",
  correo: "valsolano1111@soy.sena.edu.co",
  password: hashPass,
  RolId: 1,
  EstadoId: 1,
  updatedAt: "2024-02-03T03:17:30.386Z",
  createdAt: "2024-02-03T03:17:30.386Z",
};

const guardarMaster = async () => {
  try {
    await Usuario.sync();
    const usuarios = await Usuario.findAll();
    if (usuarios.length === 0) {
      await Usuario.create(master);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
setTimeout(() => {
  guardarMaster();
}, 2500);

export default Usuario;
