import { verificarToken } from "../libs/token.js";

//Opcion 1
export const rutaProtegida = async (req, res, next) => {
  try {
    let accessToken = req.headers["authorization"];
    if (!accessToken) {
      return res.status(401).json({
        message: "No autorizado",
      });
    }

    const token = accessToken.split(" ")[1];

    const data = await verificarToken(token);
    req.usuario = data;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




// Opcion 2

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