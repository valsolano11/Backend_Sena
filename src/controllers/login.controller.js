import { crearToken } from "../libs/token.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { Documento, password } = req.body;

    const usuario = await Usuario.findOne({
      where: { Documento },
    });

    if (!usuario) {
      return res.status(404).json({
        message: "Credenciales inválidas",
      });
    }

    const esPasswordValido = await bcrypt.compare(password, usuario.password);

    if (!esPasswordValido) {
      return res.status(404).json({
        message: "Credenciales inválidas",
      });
    }

    const token = await crearToken({ Documento: usuario.Documento });

    res.cookie("token", token).status(200).json({
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
