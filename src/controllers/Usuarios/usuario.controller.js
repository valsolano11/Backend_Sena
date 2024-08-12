import Usuario from "../../models/Usuario.js";
import Rol from "../../models/Rol.js";
import Estado from "../../models/Estados.js";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { Op } from "sequelize";

config();

const DOCUMENTO_ADMIN = process.env.DOCUMENTO_ADMIN;

export const crearUsuario = async (req, res) => {
  try {
    const consultaId = await Usuario.findByPk(req.body.id);
    if (consultaId) {
      return res.status(400).json({ message: "El ID del usuario ya existe" });
    }

    const consultaRol = await Rol.findByPk(req.body.RolId);
    if (!consultaRol) {
      return res.status(400).json({ message: "Rol no encontrado" });
    }

    const consultaCorreo = await Usuario.findOne({
      where: {
        correo: req.body.correo,
      },
    });
    if (consultaCorreo) {
      return res.status(400).json({ message: "El correo ya existe" });
    }
    const consultaDocumento = await Usuario.findOne({
      where: {
        Documento: req.body.Documento,
      },
    });
    if (consultaDocumento) {
      return res.status(400).json({ message: "El documento ya existe" });
    }

    let data = req.body;
    const salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);

    const crearUser = await Usuario.create(data);

    const guardar = await crearUser.save();

    res.status(201).json(guardar);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: error.message });
  }
};


export const getAllusuario = async (req, res) => {
  try {
    const consultarusuario = await Usuario.findAll({
      attributes: null, // O especifica los atributos que deseas seleccionar
      include: [
        {
          model: Rol,
          attributes: ['rolName']
        },
        {
          model: Estado,
          attributes: ['estadoName']
        }
      ]
    });
    res.status(200).json(consultarusuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const consultarusuario = await Usuario.findByPk(req.params.id, {
      include: [
        {
          model: Rol,
          attributes: ['rolName']
        },
        {
          model: Estado,
          attributes: ['estadoName']
        }
      ]
    });
    if (!consultarusuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
    res.status(200).json(consultarusuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const Putusuario = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const consultarusuario = await Usuario.findByPk(id);
    if (!consultarusuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    if (body.correo) {
      const emailExists = await Usuario.findOne({
        where: {
          correo: body.correo,
          id: { [Op.ne]: consultarusuario.id },
        },
      });
      if (emailExists) {
        return res.status(400).json({
          message: "El email ya está en uso por otro usuario",
        });
      }
    }

    if (body.documento) {
      const documentoExists = await Usuario.findOne({
        where: {
          Documento: body.documento,
          id: { [Op.ne]: consultarusuario.id },
        },
      });
      if (documentoExists) {
        return res.status(400).json({
          message: "El documento ya está en uso por otro usuario",
        });
      }
    }

    if (
      consultarusuario.correo === DOCUMENTO_ADMIN &&
      (body.RolId || body.EstadoId)
    ) {
      return res.status(403).json({
        message: "No se puede cambiar el rol o el estado del admin principal",
      });
    }

    for (let key in body) {
      if (body[key] === null) {
        return res.status(400).json({
          message: `El campo ${key} no puede ser nulo`,
        });
      }
    }

    await consultarusuario.update(body);

    return res.status(200).json({
      message: "Usuario actualizado correctamente",
      usuario: consultarusuario,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el usuario",
      error: error.message,
    });
  }
};