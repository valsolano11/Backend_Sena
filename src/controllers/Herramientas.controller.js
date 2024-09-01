import Herramienta from "../models/Herramientas.js";
import Subcategoria from "../models/Subcategoria.js";
import Estado from "../models/Estados.js";
import Usuario from "../models/Usuario.js";
import { Op } from "sequelize";


export const crearHerramienta = async (req, res) => {
    try {
        const { nombre, codigo, marca, condicion, observaciones, UsuarioId, EstadoId, SubcategoriaId } = req.body;

        const consultaCodigo = await Herramienta.findOne({ where: { codigo } });
        if (consultaCodigo) {
            return res.status(400).json({ error: 'El código de la herramienta ya existe' });
        }

        const consultaUsuario = await Usuario.findByPk(UsuarioId);
        if (!consultaUsuario) {
            return res.status(400).json({ message: "El usuario especificado no existe" });
        }

        const consultaSubcategoria = await Subcategoria.findByPk(SubcategoriaId, {
            include: [{ model: Estado, as: 'Estado' }]
        });
        if (!consultaSubcategoria) {
            return res.status(400).json({ message: "La subcategoría especificada no existe" });
        }

        if (consultaSubcategoria.Estado.estadoName !== 'ACTIVO') {
            return res.status(400).json({ error: 'La subcategoría no está en estado ACTIVO' });
        }

        let estadoId = EstadoId;
        if (condicion === 'Malo') {
            const estadoInactivo = await Estado.findOne({ where: { estadoName: 'INACTIVO' } });
            if (!estadoInactivo) {
                return res.status(500).json({ error: 'Estado INACTIVO no encontrado' });
            }
            estadoId = estadoInactivo.id;
        } else {
            const consultaEstado = await Estado.findByPk(EstadoId);
            if (!consultaEstado) {
                return res.status(400).json({ message: "El estado especificado no existe" });
            }
        }

        const herramienta = await Herramienta.create({
            nombre,
            codigo,
            marca,
            condicion,
            observaciones,
            UsuarioId,
            EstadoId: estadoId,
            SubcategoriaId
        });

        res.status(201).json(herramienta);
    } catch (error) {
        console.error("Error al crear la herramienta", error);
        res.status(500).json({ message: error.message });
    }
};

export const getAllHerramienta = async (req, res) =>{
    try {
        let consultaHerramieta = await Herramienta.findAll({
            attributes: null,
            include: [
                { model: Usuario, attributes: ['nombre',] },
                { model: Subcategoria, attributes: ['subcategoriaName'] },
                { model: Estado, attributes: ['estadoName'] },
            ]
        });
        res.status(200).json(consultaHerramieta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getHerramienta = async (req, res) =>{
    try {
        let consultaHerramieta = await Herramienta.findByPk(req.params.id);

        if(!consultaHerramieta){
            return res.status(404).json({ message: "Herramienta no encontrada" });
        }
        res.status(200).json(consultaHerramieta)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export const obtenerCodigosPorNombre = async (req, res) => {
    try {
        const { nombre } = req.query;

        if (!nombre) {
            return res.status(400).json({ error: 'Se requiere el parámetro "nombre"' });
        }

        const herramientas = await Herramienta.findAll({
            where: {
                nombre: {
                    [Op.iLike]: `%${nombre}%` 
                },
                estado: 'ACTIVO'
            },
            attributes: ['codigo']
        });

        if (herramientas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron herramientas con ese nombre' });
        }

        const codigos = herramientas.map(herramienta => herramienta.codigo);
        const codigosUnicos = [...new Set(codigos)]; 

        res.status(200).json(codigosUnicos);
    } catch (error) {
        console.error("Error al obtener códigos de herramientas:", error);
        res.status(500).json({ error: 'Error al obtener códigos de herramientas' });
    }
};



export const putHerramienta = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, codigo, marca, condicion, observaciones, UsuarioId, EstadoId, SubcategoriaId } = req.body;

        const herramienta = await Herramienta.findByPk(id);
        if (!herramienta) {
            return res.status(404).json({ message: "Herramienta no encontrada" });
        }

        if (codigo) {
            const consultaCodigo = await Herramienta.findOne({ where: { codigo, id: { [Op.ne]: id } } });
            if (consultaCodigo) {
                return res.status(400).json({ error: 'El código de la herramienta ya existe' });
            }
        }

        if (UsuarioId) {
            const consultaUsuario = await Usuario.findByPk(UsuarioId);
            if (!consultaUsuario) {
                return res.status(400).json({ message: "El usuario especificado no existe" });
            }
        }

        if (SubcategoriaId) {
            const consultaSubcategoria = await Subcategoria.findByPk(SubcategoriaId, {
                include: [{ model: Estado, as: 'Estado' }]
            });
            if (!consultaSubcategoria) {
                return res.status(400).json({ message: "La subcategoría especificada no existe" });
            }

            if (consultaSubcategoria.Estado.estadoName !== 'ACTIVO') {
                return res.status(400).json({ error: 'La subcategoría no está en estado ACTIVO' });
            }
            herramienta.SubcategoriaId = SubcategoriaId;
        }

        if (condicion === 'Malo') {
            const estadoInactivo = await Estado.findOne({ where: { estadoName: 'INACTIVO' } });
            if (!estadoInactivo) {
                return res.status(500).json({ error: 'Estado INACTIVO no encontrado' });
            }
            herramienta.EstadoId = estadoInactivo.id;
        } else if (EstadoId) {
            const consultaEstado = await Estado.findByPk(EstadoId);
            if (!consultaEstado) {
                return res.status(400).json({ message: "El estado especificado no existe" });
            }
            herramienta.EstadoId = EstadoId;
        }

        herramienta.nombre = nombre || herramienta.nombre;
        herramienta.codigo = codigo || herramienta.codigo;
        herramienta.marca = marca || herramienta.marca;
        herramienta.condicion = condicion || herramienta.condicion;
        herramienta.observaciones = observaciones || herramienta.observaciones;
        herramienta.UsuarioId = UsuarioId || herramienta.UsuarioId;

        await herramienta.save();

        res.status(200).json(herramienta);
    } catch (error) {
        console.error("Error al actualizar la herramienta", error);
        res.status(500).json({ message: error.message });
    }
};
