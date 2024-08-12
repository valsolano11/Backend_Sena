import Rol from "../models/Rol.js";

export const crearRol = async (req, res) => {
  try {
    const consulta = await Rol.findOne({
      where: { rolName: req.body.rolName },
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
    let roles = await Rol.findAll({
        attributes: null,
    });

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

export const putRoles = async (req, res) => {
  try {
    const RolActualizado = await Rol.findByPk(req.params.id);

    if (!RolActualizado) {
      return res.status(404).json({
        message: "Rol no encontrado",
      });
    }

    await RolActualizado.update(req.body);

    res.status(200).json({
      message: "Rol actualizado correctamente",
      rol: RolActualizado,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el rol",
      error: error.message,
    });
  }
};
