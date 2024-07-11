import Estado from "../models/Estados.js";
import Ficha from "../models/Fichas.js";
import Usuario from "../models/Usuario.js";

export const crearFicha = async (req, res) => {
  try {
    const { id, UsuarioId, EstadoId, NumeroFicha } = req.body;

    const consultaId = await Ficha.findByPk(id);
    if (consultaId) {
      return res.status(400).json({ message: "La ficha con ese id ya existe" });
    }

    const consultaUsuario = await Usuario.findByPk(UsuarioId);
    if (!consultaUsuario) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const consultaEstado = await Estado.findByPk(EstadoId);
    if (!consultaEstado) {
      return res.status(400).json({ message: "El estado especificado no existe" });
    }

    const nuevaFicha = { NumeroFicha, EstadoId, UsuarioId,};

    const fichaCreada = await Ficha.create(nuevaFicha);

    res.status(200).json(fichaCreada);
  } catch (error) {
    console.error("Error al crear la ficha", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllFichas = async (req, res) => {
  try {
    let Fichas = await Ficha.findAll();

    res.status(200).json(Fichas);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getFicha = async (req, res) => {
  try {
    let Fichas = await Ficha.findByPk(req.params.id);

    if (!Fichas) {
      return res.status(404).json({ mensaje: "No se encontró la ficha" });
    }

    res.status(200).json(Fichas);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateFicha = async (req, res) => {
  try {
    const { UsuarioId, EstadoId, NumeroFicha } = req.body;

    const ficha = await Ficha.findByPk(req.params.id);
    if (!ficha) {
      return res.status(404).json({ message: "Ficha no encontrada" });
    }

    if (UsuarioId) {
      const consultaUsuario = await Usuario.findByPk(UsuarioId);
      if (!consultaUsuario) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }
      ficha.UsuarioId = UsuarioId;
    }

    if (EstadoId) {
      const consultaEstado = await Estado.findByPk(EstadoId);
      if (!consultaEstado) {
        return res
          .status(400)
          .json({ message: "El estado especificado no existe" });
      }
      ficha.EstadoId = EstadoId;
    }

    if (NumeroFicha) {
      ficha.NumeroFicha = NumeroFicha;
    }

    await ficha.save();

    res.status(200).json(ficha);
  } catch (error) {
    console.error("Error al actualizar la ficha", error);
    res.status(500).json({ message: error.message });
  }
};