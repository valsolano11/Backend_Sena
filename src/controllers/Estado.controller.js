import Estado from "../models/Estados.js";

// Función para obtener estados filtrados según la entidad
const obtenerEstadosPorTipo = async (tipoEntidad) => {
  try {
    console.log("Tipo de entidad recibido:", tipoEntidad); 
    let estadosFiltrados;
    switch (tipoEntidad) {
      case "usuario":
      case "ficha":
      case "instructore":
        estadosFiltrados = await Estado.findAll({
          where: { estadoName: ["ACTIVO", "INACTIVO"] },
        });
        break;
      case "producto":
      case "herramienta":
        estadosFiltrados = await Estado.findAll({
          where: { estadoName: ["AGOTADO", "ACTIVO", "INACTIVO"] },
        });
        break;
      case "pedido":
      case "prestamo":
        estadosFiltrados = await Estado.findAll({
          where: { estadoName: ["PENDIENTE", "EN PROCESO", "ENTREGADO"] },
        });
        break;
      case "subcategoria":
        estadosFiltrados = await Estado.findAll({
          where: { estadoName: ["ACTIVO", "INACTIVO"] },
        });
        break;
      default:
        estadosFiltrados = [];
    }
    console.log("Estados filtrados encontrados:", estadosFiltrados); 
    return estadosFiltrados;
  } catch (error) {
    throw new Error(error.message);
  }
};


// Obtener todos los estados (sin filtro)
export const getAllEstado = async (req, res) => {
  try {
    const consultarEstado = await Estado.findAll();
    res.status(200).json(consultarEstado);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Obtener un estado por ID
export const getEstado = async (req, res) => {
  try {
    const consultarEstado = await Estado.findByPk(req.params.id);

    if (!consultarEstado) {
      return res.status(404).json({
        message: "Estado no encontrado",
      });
    }

    res.status(200).json(consultarEstado);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Obtener estados filtrados por tipo de entidad
export const getEstadosPorTipo = async (req, res) => {
  const { tipoEntidad } = req.params;
  try {
    const estadosFiltrados = await obtenerEstadosPorTipo(tipoEntidad);
    res.status(200).json(estadosFiltrados);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
