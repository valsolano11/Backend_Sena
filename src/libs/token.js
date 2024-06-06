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
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
          return reject(err);
        }

        const { Documento } = decoded;
        const usuario = await Usuario.findOne({
          where: { Documento },
        });

        if (!usuario) {
          return reject({ message: "Usuario no encontrado", usuario });
        }

        resolve({
          token,
          usuario: {
            Documento: usuario.Documento,
          },
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
