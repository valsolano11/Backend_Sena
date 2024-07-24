
import Categoria from "../models/Categoria.js";
import Estado from "../models/Estados.js";

export const crearCategoria = async (req, res) => {
    try {
        const consultaId = await Categoria.findByPk(req.body.id);
        if (consultaId) {
            return res.status(400).json({ message: "El Id de la categoria ya existe"})
        }

        const consultaNombre = await Categoria.findOne({
            where:{categoriaName: req.body.categoriaName},
        });
        if (consultaNombre) {
            return res.status(400).json({ message: "El nombre de la categoria ya existe"})
        }

        const consultaEstado = await Estado.findByPk(req.body.id);
        if (consultaEstado) {
          return res.status(400).json({ message: "El estado especificado no existe" });
        }

        let data = req.body;
        const crearCategorias = await Categoria.create(data);
        const response = await crearCategorias.save();
        
        res.status(201).json(response);
    } catch (error) {
        console.error("Error al crear la Categoria", error);
        res.status(500).json({ message: error.message });
    }
}

export const getAllCategoria= async (req, res) => {
    try {
        let categorias = await Categoria.findAll({
            atributes: null,
        });

        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCategoria = async (req, res) => {
    try {
        let categorias = await Categoria.findByPk(req.params.id);

        if (!categorias) {
            return res.status(404).json({ message: "No se encontró la categoria" });
        }

        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const putCategoria = async (req, res) => {
  try {
    const consultarCategorias = await Categoria.findByPk(req.params.id);

    if (!consultarCategorias) {
      return res.status(404).json({
        message: "Categoria no encontrada",
      });
    }

    await consultarCategorias.update({
      categoriaName: req.body.categoriaName,
      EstadoId: req.body.EstadoId,
    });

    res.status(200).json({
      message: "categoria actualizada",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
