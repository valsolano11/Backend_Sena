import Pedido from "../models/Pedido.js";
import Producto from "../models/Productos.js";
import Instructores from "../models/Instructores.js";
import Fichas from "../models/Fichas.js";
import Usuario from "../models/Usuario.js";
import Estado from "../models/Estados.js";

export const crearPedido = async (req, res) => {
    try {
        const { cantidadSolicitada, cantidadEntregada, UsuarioId, InstructorId, fichaId, ProductoId } = req.body;

        const producto = await Producto.findByPk(ProductoId);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
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

        // Validar la cantidad solicitada y entregada
        if (cantidadSolicitada <= 0) {
            return res.status(400).json({ error: 'La cantidad solicitada debe ser mayor que cero' });
        }

        if (cantidadEntregada <= 0) {
            return res.status(400).json({ error: 'La cantidad entregada debe ser mayor que cero' });
        }

        // Ajustar cantidadEntregada si excede la cantidad disponible
        const cantidadDisponible = producto.cantidadActual;
        const cantidadAEntregar = Math.min(cantidadEntregada, cantidadDisponible);

        const pedido = await Pedido.create({
            ProductoId,
            cantidadSolicitada,
            cantidadEntregada: cantidadAEntregar,
            fechaPedido: new Date(),
            codigo: producto.codigo,  
            UsuarioId,
            InstructorId,
            fichaId
        });

        // Actualizar el inventario del producto
        producto.cantidadSalida += cantidadAEntregar;
        producto.cantidadActual -= cantidadAEntregar;

        if (producto.cantidadActual === 0) {
            const estadoInactivo = await Estado.findOne({ where: { estadoName: 'INACTIVO' } });
            if (estadoInactivo) {
                producto.EstadoId = estadoInactivo.id;
            }
        }

        await producto.save();

        res.status(201).json(pedido);
    } catch (error) {
        console.error("Error al crear el pedido", error);
        res.status(500).json({ error: 'Error al crear el pedido' });
    }
};


export const getAllPedidos = async (req, res) => {
    try {
        let consultaPedido = await Pedido.findAll({
            attributes: null,
            include: [
                { model: Producto },
                { model: Usuario },
                { model: Instructores },
                { model: Fichas }
            ]
        });
        res.status(200).json(consultaPedido)
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

export const getPedidos = async (req, res) => {
    try {
        let consultaPedido = await Pedido.findByPk(req.params.id);

        if(!consultaPedido){
            return res.status(404).json({ message: 'Pedido no encontrado'});
        }
        res.status(200).json(consultaPedido);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const putPedidos = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
};