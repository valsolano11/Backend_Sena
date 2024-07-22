import Instructor from "../../models/Instructores.js";
import Estado from "../../models/Estados.js";
import Usuario from "../../models/Usuario.js";
import { Op } from "sequelize";
import Instructores from "../../models/Instructores.js";


export const crearInstructor = async (req, res) => {
  try {
    const { nombre, correo,celular, EstadoId, UsuarioId } = req.body;

    const consultaCorreo = await Instructor.findOne({ where: { correo } });
    if (consultaCorreo) {
      return res.status(400).json({ message: "El instructor con ese correo ya existe" });
    }

    const consultaUsuario = await Usuario.findByPk(UsuarioId);
    if (!consultaUsuario) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }
    const consultaCelular = await Instructores.findOne({
            where: 
            { 
              celular: celular },
          });
    if (consultaCelular) {
      return res.status(400).json({ message: "El celular ya está usado por otro usuario" });
    }
    const consultaEstado = await Estado.findByPk(EstadoId);
    if (!consultaEstado) {
      return res.status(400).json({ message: "El estado especificado no existe" });
    }

    const nuevoInstructor = { nombre, correo, celular, EstadoId, UsuarioId };

    const instructorCreado = await Instructor.create(nuevoInstructor);
    

    res.status(201).json(instructorCreado);
  } catch (error) {
    console.error("Error al crear el instructor", error);
    res.status(500).json({ message: error.message });
  }
};
export const getAllInstructores = async (req, res) => {
  try {
    let instructores = await Instructor.findAll();

    res.status(200).json(instructores);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getInstructor = async (req, res) => {
  try {
    let instructor = await Instructor.findByPk(req.params.id);

    if (!instructor) {
      return res.status(404).json({ message: "No se encontró el instructor" });
    }

    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const actualizarInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, celular, EstadoId, UsuarioId } = req.body;

    const instructor = await Instructor.findByPk(id);

    if (!instructor) {
      return res.status(404).json({ message: "No se encontró el instructor" });
    }
    if (correo) {
      const consultaCorreo = await Instructor.findOne({
        where: { correo, id: { [Op.ne]: id } },
      });
      if (consultaCorreo) {
        return res.status(400).json({ message: "El instructor con ese correo ya existe" });
      }
    }
     if (celular) {
       const consultacelular = await Instructores.findOne({
         where: { celular: celular },
       });
       if (consultacelular) {
         return res.status(400).json({ message: "El celular ya esta usado por otro usuario" });
       }
     }
    if (UsuarioId) {
      const consultaUsuario = await Usuario.findByPk(UsuarioId);
      if (!consultaUsuario) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }
    }

    if (EstadoId) {
      const consultaEstado = await Estado.findByPk(EstadoId);
      if (!consultaEstado) {
        return res.status(400).json({ message: "El estado especificado no existe" });
      }
    }
   

    if (nombre) instructor.nombre = nombre;
    if (correo) instructor.correo = correo;
    if (celular) instructor.celular = celular;
    if (EstadoId) instructor.EstadoId = EstadoId;
    if (UsuarioId) instructor.UsuarioId = UsuarioId;

    await instructor.update();

    res.status(200).json(instructor);
  } catch (error) {
    console.error("Error al actualizar el instructor", error);
    res.status(500).json({ message: error.message });
  }
};
