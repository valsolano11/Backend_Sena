import Prestamo from "../models/Prestamo.js";
import Herramienta from "../models/Herramientas.js";
import Instructores from "../models/Instructores.js";
import Fichas from "../models/Fichas.js";
import Usuario from "../models/Usuario.js";
import Estado from "../models/Estados.js";


export const crearPrestamo = async (req, res) => {
    try {
        const { HerramientaId, UsuarioId, InstructorId, fichaId, observaciones, FechaDevolucion } = req.body;

        const herramienta = await Herramienta.findByPk(HerramientaId);
        if (!herramienta) {
            return res.status(404).json({ error: 'Herramienta no encontrada' });
        }

        const usuario = await Usuario.findByPk(UsuarioId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const instructor = await Instructores.findByPk(InstructorId);
        if (!instructor) {
            return res.status(404).json({ error: 'Instructor no encontrado' });
        }

        const ficha = await Fichas.findByPk(fichaId);
        if (!ficha) {
            return res.status(404).json({ error: 'Ficha no encontrada' });
        }


        const prestamo = await Prestamo.create({
            HerramientaId,
            UsuarioId,
            InstructorId,
            fichaId,
            observaciones,
            FechaPrestamo: new Date(),
            FechaDevolucion,
            codigo: herramienta.codigo, 
        });

        const estadoInactivo = await Estado.findOne({ where: { estadoName: 'INACTIVO' } });
        if (!estadoInactivo) {
            return res.status(500).json({ error: 'Estado INACTIVO no encontrado' });
        }

        herramienta.EstadoId = estadoInactivo.id;
        await herramienta.save();

        res.status(201).json(prestamo);
    } catch (error) {
        console.error("Error al crear el préstamo", error);
        res.status(500).json({ error: 'Error al crear el préstamo' });
    }
};


export const getAllPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamo.findAll({
            attributes: null,
            include: [
                { model: Usuario, attributes: ['nombre'] },
                { model: Instructores, attributes: ['nombre'] },
                { model: Fichas, attributes: ['fichaName'] },
                { model: Herramienta, attributes: ['nombre', 'codigo'] }
            ]
        });
        res.status(200).json(prestamos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPrestamo = async (req, res) => {
    try {
        const prestamo = await Prestamo.findByPk(req.params.id, {
            include: [
                { model: Usuario, attributes: ['nombre'] },
                { model: Instructores, attributes: ['nombre'] },
                { model: Fichas, attributes: ['fichaName'] },
                { model: Herramienta, attributes: ['nombre', 'codigo'] }
            ]
        });

        if (!prestamo) {
            return res.status(404).json({ message: 'Prestamo no encontrado' });
        }

        res.status(200).json(prestamo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const putPrestamos = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};