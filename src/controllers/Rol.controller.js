import Rol from "../models/Rol.js";

export const crearRol = async (req, res) => {
  try {
    const consulta = await Rol.findOne({
      where: { id: req.body.id },
    });

    if (consulta) {
      return res.status(400).json({
        message: "El rol ya existe",
      });
    }

    const crearRol = await Rol.create(req.body);

    const response = await crearRol.save();

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllRol = async (req, res) => {
  try {
    let roles = await Rol.findAll();

    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRol = async (req, res) => {
  try {
    let rol = await Rol.findByPk(req.params.id);

    if (!rol) {
      return res.status(404).json({ mensaje: "No se encontró el" });
    }

    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json(error);
  }
};

/* 
export const getRol = async (req, res) => {
  try {
    let roles = await Rol.findAll();

    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllRol = async (req, res) => {
  try {
    let rol = await Rol.findByPk(req.params.id);

    if (!rol) {
      return res.status(404).json({ mensaje: "No se encontró el rol" });
    }

    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json(error);
  }
}; */
// No se pueden eliminar los roles

/* export const deleteRol = async (req, res) => {
  try {
    const consultarRol = await Rol.findByPk(req.params.id);

    if (!consultarRol) {
      return res.status(404).json({
        message: "Rol no encontrado",
      });
    }

    await consultarRol.destroy();

    res.status(200).json({
      message: `Rol ${consultarRol.nombre} eliminada`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
}; */