import Rol from "../models/rol.js";
import Usuario from "../models/Usuario.js";
import Estado from "../models/Estados.js"

export const validarRolAdmin = async (req, res, next) => {
  try {
    const consultarRol = await Usuario.findOne({
      where: {
        Documento: req.usuario.usuario.Documento,
      },
      include: {
        model: Rol,
        model: Estado
      },
    });

    if (!consultarRol) {
      return res.status(401).json({
        message: "No se encontro el usuario",
      });
    }

    if (consultarRol.Rol.rolName === "ADMIN") {
      return next();
    }

    return res.status(401).json({
      message: "No tienes el rol para hacerlo",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
