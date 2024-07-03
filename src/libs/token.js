import jwt from "jsonwebtoken";
import { config } from "dotenv";
import Usuario from "../models/Usuario.js";

config();

const secretKey = process.env.SECRET_KEY;

export const crearToken = (data, time = "1d") => {
  return new Promise((resolve, reject) => {
    try {
      jwt.sign(data, secretKey, { expiresIn: time }, (err, token) => {
        if (err) {
          return reject(err);
        }
        resolve(token);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const verificarToken = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if (err) {
          return reject(err);
        }
        let Documento = decoded.Documento;
        const usuario = await Usuario.findOne({
          where: { Documento },
        });

        if (!usuario) {
          return reject({ message: "Usuario no encontrado" });
        }

        resolve({
          token,
          usuario: {
            id: usuario.id,
            Documento: usuario.Documento,
          },
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const verificarTokenRecupercion = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.SECRET_KEYy, async (err, decoded) => {
        if (err) {
          return reject(err);
        }

        resolve(decoded);
      });
    } catch (error) {
      reject(error);
    }
  });
};
