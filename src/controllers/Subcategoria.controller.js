import Subcategoria from "../models/Subcategoria.js";
import Categoria from "../models/Categoria.js";
import Estado from "../models/Estados.js";
import { Op } from 'sequelize';

export const crearSubcategoria   = async (req, res) =>{
    try {

        const {CategoriaId, EstadoId}  = req.body;
        const consultaId =  await Subcategoria.findByPk(req.body.id);
        if (consultaId) {
            return res.status(400).json({ message: "Subcategoria no encontrada" });
        }

        const consultaNombre = await Subcategoria.findOne({
            where:{subcategoriaName: req.body.subcategoriaName},
        });
        if (consultaNombre) {
            return res.status(400).json({ message: "El nombre de la Subcategoria ya existe"})
        }

        const consultacategoria = await Categoria.findByPk(CategoriaId);
        if (!consultacategoria) {
            return res.status(400).json({ message: "El estado especificado no existe" });
        }

        const consultaEstado = await Estado.findByPk(EstadoId);
        if (!consultaEstado) {
            return res.status(400).json({ message: "El estado especificado no existe" });
        }

        let data = req.body;
        const crearSubcategorias = await Subcategoria.create(data);
        const response = await crearSubcategorias.save();
        
        res.status(201).json(response);
    } catch (error) {
        console.error("Error al crear la Subcategoria", error);
        res.status(500).json({ message: error.message });
    }
};

export const getallSubcategoria   = async (req, res) =>{
    try {
        let subcategorias = await Subcategoria.findAll({
            attributes: null,
            include: [
                {
                    model: Categoria,
                    attributes: ['categoriaName']
                },
                {
                    model: Estado,
                    attributes: ['estadoName'] 
                }
            ],
        });

        res.status(200).json(subcategorias)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getSubcategoria   = async (req, res) =>{
    try {
        let subcategorias = await Subcategoria.findByPk(req.params.id);

        if(!subcategorias){
            return res.status(404).json({ message: "Subcategoría no encontrada" });
        }

        res.status(200).json(subcategorias)
    } catch (error) {
        res.status(500).json(error);
    }
};


export const putSubcategoria = async (req, res) => {
    try {
        const { CategoriaId, subcategoriaName , EstadoId} = req.body;
        const subcategId = req.params.id;


        const consultaId = await Subcategoria.findByPk(subcategId);
        if (!consultaId) {
            return res.status(400).json({ message: "Subcategoría no encontrada" });
        }

        if (subcategoriaName) {
            const consultaNombre = await Subcategoria.findOne({
                where: {
                    subcategoriaName: subcategoriaName,
                    id: {
                        [Op.ne]: subcategId, 
                    },
                },
            });

            if (consultaNombre) {
                return res.status(400).json({ message: "El nombre de la subcategoría ya existe" });
            }
            consultaId.subcategoriaName = subcategoriaName;
        }

        if (CategoriaId) {
            const consultacategoria = await Categoria.findByPk(CategoriaId);
            if (!consultacategoria) {
                return res.status(400).json({ message: "La categoría especificada no existe" });
            }
            consultaId.CategoriaId = CategoriaId;
        }

        if (EstadoId) {
            const consultaestado = await Estado.findByPk(EstadoId);
            if (!consultaestado) {
                return res.status(400).json({ message: "El estado especificado no existe" });
            }
            consultaId.EstadoId = EstadoId;
        }

        await consultaId.save();

        res.status(200).json({
            message: "Subcategoría actualizada con éxito",
            subcategoria: consultaId,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar la subcategoría",
            error: error.message,
        });
    }
};
