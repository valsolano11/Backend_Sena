/* import { Op } from "sequelize";
import Rol from "../models/Rol.js";

export const validarRolUsuario = async (req, res, next) => {
  try {
    // Verificar si el rol es válido para el usuario
    const usuarioRol = await Rol.findOne({
      where: {
        rolName: { [Op.in]: ["ADMIN", "USUARIO"] },
      },
    });

    if (!usuarioRol) {
      return res.status(404).json("No se encontraron roles válidos");
    }

    // Verificar el tipo de usuario
    if (usuarioRol.rolName === "ADMIN") {
      req.body.RolId = usuarioRol.id;
      req.body.isAdmin = true;
    } else if (usuarioRol.rolName === "USUARIO") {
      req.body.RolId = usuarioRol.id;
      req.body.isAdmin = false;
    } else {
      return res.status(404).json("No se encontró un rol válido");
    }

    return next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
 */