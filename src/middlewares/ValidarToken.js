/* import { verificarToken } from "../libs/token.js";

export const urlProtegida = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        message: "No autorizado. No se proporcionó un token.",
      });
    }

    try {
      const data = await verificarToken(token);
      req.usuario = data;
      next();
    } catch (verificationError) {
      return res.status(401).json({
        message: "No autorizado. Token inválido o expirado.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrió un error en el servidor.",
      error: error.message,
    });
  }
};
 */