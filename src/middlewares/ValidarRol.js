/* import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";

// Middleware para obtener el usuario
export const obtenerUsuario = async (req, res, next) => {
  try {
    const usuario = await Usuario.findOne({
      where: {
        Documento: req.usuario.Documento,
      },
      include: {
        model: Rol,
        attributes: ["rolName"],
      },
    });

    if (!usuario) {
      return res.status(401).json({
        message: "No se encontró el usuario",
      });
    }

    req.usuarioInfo = usuario;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Middleware para validar el rol de administrador
export const validarRolAdmin = (req, res, next) => {
  try {
    const { usuarioInfo } = req;

    if (usuarioInfo.Rol && usuarioInfo.Rol.rolName === "ADMIN") {
      return next();
    }

    return res.status(401).json({
      message: "No tienes permiso para acceder a este sitio",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Middleware para validar el rol de Usuario
export const validarRolUsuario = (req, res, next) => {
  try {
    const { usuarioInfo } = req;

    if (usuarioInfo.Rol && usuarioInfo.Rol.rolName === "USUARIO") {
      return next();
    }

    return res.status(401).json({
      message: "No tienes permiso para acceder a este sitio",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
 */