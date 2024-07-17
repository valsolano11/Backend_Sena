import Estado from "../models/Estados.js";

const ValidarEstadoGeneral = (Model) => async (req, res, next) => {
    try {
      const { Documento } = req.body;

      if (!Documento) {
        return res.status(400).json({ message: "El documento es requerido" });
      }

      const usuario = await Estado.findOne({
        where: { Documento },
        
      });

      if (!usuario) {
        return res.status(404).json({
            message: `No se encontró un usuario con el documento: ${Documento}`,
          });
      }

      const estadoUsuario = usuario.Estado.nombre;

      if (estadoUsuario !== estadoActivo) {
        return res.status(403).json({
          message: `El usuario con documento: ${Documento} se encuentra en estado: ${estadoUsuario}, no puede iniciar sesión.`,
        });
      }

      next();
    } catch (error) {
      console.error(`Error al verificar el estado de ${Model.name}:`, error);
     return res.status(500).json({
          message: `Error al verificar el estado del usuario: ${error.message}`,
        });
    }
  };

export default ValidarEstadoGeneral;
