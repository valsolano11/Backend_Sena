import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";

export const validarRolAdmin = async (req, res, next) => {
  try {
    console.log("req.usuario:", req.usuario);
    if (
      !req.usuario ||
      !req.usuario.usuario ||
      !req.usuario.usuario.Documento
    ) {
      return res.status(400).json({
        message: "Faltan credenciales de usuario",
      });
    }

    const usuario = await Usuario.findOne({
      where: {
        Documento: req.usuario.usuario.Documento,
      },
      include: {
        model: Rol,
      },
    });

    if (!usuario) {
      return res.status(401).json({
        message: "No se encontró el usuario",
      });
    }

    if (usuario.Rol.rolName !== "ADMIN") {
      return res.status(403).json({
        message: "No tienes el rol para hacerlo",
      });
    }

    req.usuarioInfo = usuario;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
