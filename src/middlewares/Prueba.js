/* import { verificarToken } from "../libs/token.js";

export const validacionTokenUsuario = async (req, res, next) => {
  try {
    let accessToken = req.headers["authorization"];
    if (!accessToken) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }

    const token = accessToken.split(" ")[1];
    const data = await verificarToken(token);
    console.log("Usuario decodificado:", data.usuario); 

    req.usuario = data.usuario;

    if (!req.usuario || req.usuario.RolId !== 1) {
      return res.status(403).json({
        message: "Acceso denegado. No eres un administrador.",
      });
    }

    next();
  } catch (error) {
    console.error("Error en la validación del token", error);
    res.status(400).json({ message: "Token inválido" });
  }
};
 */