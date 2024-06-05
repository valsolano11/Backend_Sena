import Usuario from "../models/Usuario.js";
import Rol from "../models/Rol.js";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

config();

const { DOCUMENT_ADMIN } = process.env;
export const crearUsuario = async (req, res) => {
  try {
    const consulta = await Usuario.findByPk(req.body.id);

    if (consulta) {
      return res.status(400).json({
        message: "El id del usuario ya existe",
      });
    }

    const consultaRol = await Rol.findByPk(req.body.RolId);
    if (!consultaRol) {
      return res.status(400).json({
        message: "Rol no encontrado",
      });
    }

    let data = req.body;

    var salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    const crearUser = await Usuario.create(data);

    const guardar = await crearUser.save();
    res.status(201).json(guardar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllUsuario = async (req, res) => {
  try {
    const consultarUsuarios = await Usuario.findAll();

    res.status(200).json(consultarUsuarios);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUsuario = async (req, res) => {
  try {
    const consultarUsuarios = await Usuario.findByPk(req.params.id);

    if (!consultarUsuarios) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.status(200).json(consultarUsuarios);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const putUsuario = async (req, res) => {
  try {
    const consultarUsuarios = await Usuario.findByPk(req.params.id);

    if (!consultarUsuarios) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    if (req.body.id === DOCUMENT_ADMIN) {
      delete data.id;
    }
    
    if (req.params.id === DOCUMENT_ADMIN && req.body.RolId === 2) {
      delete data.RolId;
    }
    if (req.body.RolId) {
      const consultaRol = await Rol.findByPk(req.body.RolId);
      if (!consultaRol) {
        return res.status(400).json({
          message: "Rol no encontrado",
        });
      }
    }

    let data = req.body;
    if (data.password) {
      var salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
    }

    await consultarUsuarios.update(data);

    res.status(200).json({
      ok: true,
      message: "Usuario actualizado",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const consultarUsuarios = await Usuario.findByPk(req.params.id);

    if (!consultarUsuarios) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    if (req.params.id === process.env.DOCUMENT_ADMIN) {
      return res.status(404).json({
        message: "Usuario admin no se puede borrar",
      });
    }

    await consultarUsuarios.destroy();

    res.status(200).json({
      message: `${consultarUsuarios.nombre} Ha sido eliminado`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
