import fs from "fs";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { Op } from "sequelize";
import path from "path";
import { fileURLToPath } from "url";
import parseExcel from "../../helpers/excel.js";
import Usuario from "../../models/Usuario.js";
import Rol from "../../models/Rol.js";
import ExcelFile from "../../models/Excel.js";
import Estado from "../../models/Estados.js";


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
      where: { correo: req.body.correo },
    });
    if (consultaCorreo) {
      return res.status(400).json({ message: "El correo ya existe" });
    }

    const consultaDocumento = await Usuario.findOne({
      where: { Documento: req.body.Documento },
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
      attributes: null,
      include: [
        {
          model: Rol,
          attributes: ["rolName"],
        },
        {
          model: Estado,
          attributes: ["estadoName"],
        },
      ],
    });
    res.status(200).json(consultarusuario);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUsuario = async (req, res) => {
  try {
    const consultarusuario = await Usuario.findByPk(req.params.id);
    if (!consultarusuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(consultarusuario);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const Putusuario = async (req, res) => {
  try {
    const consultarusuario = await Usuario.findByPk(req.params.id);
    if (!consultarusuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (req.body.correo) {
      const emailExists = await Usuario.findOne({
        where: {
          correo: req.body.correo,
          id: { [Op.ne]: req.params.id },
        },
      });
      if (emailExists) {
        return res.status(400).json({ message: "El email ya está en uso por otro usuario" });
      }
    }

    if (req.body.Documento) {
      const documentoExists = await Usuario.findOne({
        where: {
          Documento: req.body.Documento,
          id: { [Op.ne]: req.params.id },
        },
      });
      if (documentoExists) {
        return res.status(400).json({ message: "El documento ya está en uso por otro usuario" });
      }
    }

    if (
      consultarusuario.correo === DOCUMENTO_ADMIN &&
      (req.body.RolId || req.body.EstadoId)
    ) {
      return res.status(403).json({
          message: "No se puede cambiar el rol o el estado del admin principal",
        });
    }

    for (let key in req.body) {
      if (req.body[key] === null) {
        return res.status(400).json({ message: `El campo ${key} no puede ser nulo` });
      }
    }

    await consultarusuario.update(req.body);

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

export const createUser = async (userData) => {
  return await Usuario.create(userData);
};

export const bulkCreateUsers = async (usersData) => {
  try {
    await Usuario.bulkCreate(usersData, {
      updateOnDuplicate: ["correo", "Documento"],
    });
  } catch (error) {
    throw new Error(
      "Error al insertar usuarios en la base de datos: " + error.message
    );
  }
};

export const syncDatabase = async () => {
  await ExcelFile.sync();
  await Usuario.sync();
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadPath = path.join(__dirname, "../../upload");

export const uploadUsers = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const filePath = path.join(uploadPath, req.file.filename);
    console.log(`Archivo recibido: ${filePath}`);

    const excelFile = await ExcelFile.create({ fileName: req.file.filename });

    const usersData = parseExcel(filePath);

    await bulkCreateUsers(usersData);

    excelFile.status = "processed";
    await excelFile.save();

    fs.unlinkSync(filePath);

    res.status(201).json({ message: "Users uploaded and processed successfully." });
  } catch (error) {
    console.error("Error al procesar el archivo:", error.message);
    res.status(500).json({ message: "Error al procesar el archivo: " + error.message });
  }
};
