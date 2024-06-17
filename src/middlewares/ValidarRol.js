import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";

export const validarRolAdmin = async (req, res, next) => {
  try {
    const usuario = await Usuario.findOne({
      where: { 
        Documento: req.usuario.Documento 
      },
      include: {
        include: Rol,
      },
    });

    if (!usuario) {

      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    if (usuario.Rol.rolName !== "ADMIN") {
      return res.status(403).json({
          message: "Acceso denegado. Se requiere rol de administrador.",
        });
    }
    req.usuarioInfo = usuario;
    next(); 
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al validar rol de administrador" });
  }
};
