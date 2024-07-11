/* import jwt from "jsonwebtoken";
import Usuarios from "../models/Usuario.js" 

const ValidacionFicha = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      message:
        "Usuario no autenticado o no autorizado para realizar esta acción.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const usuario = await Usuarios.findByPk(decoded.id);

    if (!usuario) {
      return res.status(401).json({
        message:
          "Usuario no autenticado o no autorizado para realizar esta acción.",
      });
    }

    req.user = { id: usuario.id }; // Establecer req.user con el ID del usuario
    next();
  } catch (error) {
    return res.status(401).json({
      message:
        "Usuario no autenticado o no autorizado para realizar esta acción.",
    });
  }
};

export default ValidacionFicha;
 */