import Estado from "../models/Estados.js";

// Se modifico esto
export const getAllEstado = async (req, res) => {
  try {
    const consultarEstado = await Estado.findAll();

    res.status(200).json(consultarEstado);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// Se modifico esto
export const getEstado = async (req, res) => {
  try {
    const consultarEstado = await Estado.findByPk(req.params.id);

    if (!consultarEstado) {
      return res.status(404).json({
        message: "Estado no encontrada",
      });
    }

    res.status(200).json(consultarEstado);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
