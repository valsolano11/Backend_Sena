import moment from 'moment';
import Prestamo from "../models/Prestamo.js";
import Herramienta from "../models/Herramientas.js";
import Instructores from "../models/Instructores.js";
import Fichas from "../models/Fichas.js";
import Usuario from "../models/Usuario.js";
import Estado from "../models/Estados.js";

export const crearPrestamo = async (req, res) => {
    try {
        const { HerramientaId, UsuarioId, InstructorId, FichaId } = req.body;

        const herramienta = await Herramienta.findByPk(HerramientaId);
        if (!herramienta) {
            return res.status(404).json({ error: 'Herramienta no encontrada' });
        }

        const estadoACTIVO = await Estado.findOne({ where: { estadoName: 'ACTIVO' } });
        if (!estadoACTIVO) {
            return res.status(500).json({ error: 'Estado ACTIVO no encontrado' });
        }

        if (herramienta.EstadoId !== estadoACTIVO.id) {
            return res.status(400).json({ error: 'La herramienta no está en bodega. Está EN USO' });
        }

        const usuario = await Usuario.findByPk(UsuarioId);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const instructor = await Instructores.findByPk(InstructorId);
        if (!instructor) {
            return res.status(404).json({ error: 'Instructor no encontrado' });
        }

        if (instructor.EstadoId !== estadoACTIVO.id) {
            return res.status(400).json({ error: 'El instructor no está en un estado ACTIVO' });
        }

        const ficha = await Fichas.findByPk(FichaId);
        if (!ficha) {
            return res.status(404).json({ error: 'Ficha no encontrada' });
        }

        if (ficha.EstadoId !== estadoACTIVO.id) {
            return res.status(400).json({ error: 'La ficha no está en un estado ACTIVO' });
        }

        const estadoEntregado = await Estado.findOne({ where: { estadoName: 'ENTREGADO' } });
        if (!estadoEntregado) {
            return res.status(500).json({ error: 'Estado ENTREGADO no encontrado' });
        }

        const prestamo = await Prestamo.create({
            HerramientaId,
            UsuarioId,
            InstructorId,
            FichaId,
            FechaPrestamo: new Date(),
            codigo: herramienta.codigo,
            EstadoId: estadoEntregado.id
        });

        const estadoEnUsoActualizado = await Estado.findOne({ where: { estadoName: 'EN USO' } });
        if (!estadoEnUsoActualizado) {
            return res.status(500).json({ error: 'Estado EN USO no encontrado' });
        }

        herramienta.EstadoId = estadoEnUsoActualizado.id;
        await herramienta.save();

        res.status(201).json({
            prestamo: {
                ...prestamo.toJSON(),
                FechaPrestamo: moment(prestamo.FechaPrestamo).format('YYYY-MM-DD HH:mmA'),
                FechaDevolucion: prestamo.FechaDevolucion ? moment(prestamo.FechaDevolucion).format('YYYY-MM-DD HH:mmA') : null
            },
            herramienta: {
                nombre: herramienta.nombre,
                codigo: herramienta.codigo
            }
        });
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
                { model: Fichas, attributes: ['NumeroFicha'] },
                { model: Estado, attributes: ['estadoName'] },
                { model: Herramienta, attributes: ['nombre', 'codigo'] }
            ]
        });

        const prestamosFormateados = prestamos.map(prestamo => ({
            ...prestamo.toJSON(),
            FechaPrestamo: moment(prestamo.FechaPrestamo).format('HH:mmA DD-MM-YYYY'),
            FechaDevolucion: prestamo.FechaDevolucion ? moment(prestamo.FechaDevolucion).format('HH:mmA DD-MM-YYYY') : null
        }));

        res.status(200).json(prestamosFormateados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPrestamo = async (req, res) => {
    try {
        const prestamo = await Prestamo.findByPk(req.params.id, {
            attributes: null,
            include: [
                { model: Usuario, attributes: ['nombre'] },
                { model: Instructores, attributes: ['nombre'] },
                { model: Fichas, attributes: ['NumeroFicha'] },
                { model: Estado, attributes: ['estadoName'] },
                { model: Herramienta, attributes: ['nombre', 'codigo'] }
            ]
        });

        if (!prestamo) {
            return res.status(404).json({ message: 'Préstamo no encontrado' });
        }

        res.status(200).json({
            ...prestamo.toJSON(),
            FechaPrestamo: moment(prestamo.FechaPrestamo).format('YYYY-MM-DD HH:mmA'),
            FechaDevolucion: prestamo.FechaDevolucion ? moment(prestamo.FechaDevolucion).format('HH:mmA DD-MM-YYYY') : null
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const putPrestamos = async (req, res) => {
    try {
        const { id } = req.params;
        const { observaciones } = req.body;

        const prestamo = await Prestamo.findByPk(id);
        if (!prestamo) {
            return res.status(404).json({ error: 'Préstamo no encontrado' });
        }

        prestamo.FechaDevolucion = new Date();
        prestamo.observaciones = observaciones;

        const estadoDEVUELTO = await Estado.findOne({ where: { estadoName: 'DEVUELTO' } });
        if (!estadoDEVUELTO) {
            return res.status(500).json({ error: 'Estado DEVUELTO no encontrado' });
        }

        prestamo.EstadoId = estadoDEVUELTO.id;
        await prestamo.save();

        const herramienta = await Herramienta.findByPk(prestamo.HerramientaId);
        if (!herramienta) {
            return res.status(404).json({ error: 'Herramienta no encontrada' });
        }

        const estadoACTIVO = await Estado.findOne({ where: { estadoName: 'ACTIVO' } });
        if (!estadoACTIVO) {
            return res.status(500).json({ error: 'Estado ACTIVO no encontrado' });
        }

        herramienta.EstadoId = estadoACTIVO.id;
        await herramienta.save();

        res.status(200).json({
            ...prestamo.toJSON(),
            FechaPrestamo: moment(prestamo.FechaPrestamo).format('HH:mmA DD-MM-YYYY'),
            FechaDevolucion: prestamo.FechaDevolucion ? moment(prestamo.FechaDevolucion).format('HH:mmA DD-MM-YYYY') : null
        });
    } catch (error) {
        console.error("Error al actualizar el préstamo", error);
        res.status(500).json({ error: 'Error al actualizar el préstamo' });
    }
};

