//ESTO NO SE DEBE CAMBIAR, LO UNICO QUE SE DEBE CAMBIAR ES LA PALABRA SENA EN DADo CASO QUE
// TENGA DISTINTO LO DE LAS VARIABLES DE ENTORNO

import { config } from "dotenv";
import { Sequelize } from "sequelize";

config();

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT, ENV } = process.env;

export const conexion =
  ENV === "SENA"? new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
          dialect: "postgres",
          ssl: true,
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      )
    : new Sequelize({
        host: DB_HOST,
        database: DB_NAME,
        dialect: "postgres",
        password: DB_PASSWORD,
        port: DB_PORT,
        username: DB_USER,
        pool: {
          max: 10,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
      });

conexion.DEBUG = true;

// ? función para verifica la conexión
export const hacerConexion = async () => {
  try {
    await conexion.authenticate();
    await conexion.sync({
      alter: true,
    });
    console.log(`<< Conexión exitosa a la base de datos`);
  } catch (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw new Error("Base de datos no conectada");
  }
};

hacerConexion();
