import Pedido from "../models/Pedido.js";
import Producto from "../models/Productos.js";
import UnidadMedida from "../models/UnidadesMedidas.js";
import Estado from "../models/Estados.js";
import { manejarExtraccion } from '../helpers/conversion.helpers.js'; 
import Usuario from "../models/Usuario.js";
import Instructores from "../models/Instructores.js";
import Fichas from "../models/Fichas.js";



export const crearPedido = async (req, res) => {
    try {
        const { 
            cantidadSolicitada, 
            cantidadSolicitadaVolumen, 
            cantidadEntregada, 
            cantidadEntregadaVolumen, 
            unidadMedidaSolicitadaId, 
            unidadMedidaEntregadaId, 
            fechaPedido, 
            ProductoId, 
            UsuarioId, 
            InstructorId, 
            fichaId, 
            EstadoId 
        } = req.body;


        const producto = await Producto.findByPk(ProductoId);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }


        const unidadMedidaProducto = await UnidadMedida.findByPk(producto.UnidadMedidaId);
        if (!unidadMedidaProducto) {
            return res.status(404).json({ error: 'Unidad de medida del producto no encontrada' });
        }


        const resultadoExtraccion = await manejarExtraccion(
            cantidadEntregada, 
            unidadMedidaProducto.id, 
            unidadMedidaEntregadaId, 
            producto.cantidadActual, 
            producto.capacidadPorPote
        );


        if (resultadoExtraccion.totalCantidadRestante == null) {
            return res.status(400).json({ error: 'Error en la extracción. Revisa las unidades de medida.' });
        }


        const pedido = await Pedido.create({
            ProductoId,
            cantidadSolicitada,
            cantidadSolicitadaVolumen,
            cantidadEntregada,
            cantidadEntregadaVolumen,
            unidadMedidaSolicitadaId,
            unidadMedidaEntregadaId,
            fechaPedido,
            codigo: producto.codigo,
            UsuarioId,
            InstructorId,
            fichaId,
            EstadoId,
            UnidadMedidaId: producto.UnidadMedidaId
        });


        const cantidadActualizada = producto.cantidadActual - resultadoExtraccion.totalCantidadRestante;
        if (cantidadActualizada < 0) {
            return res.status(400).json({ error: 'No hay suficiente cantidad disponible para este pedido.' });
        }
        producto.cantidadSalida += cantidadEntregada;
        producto.cantidadActual = cantidadActualizada;
        producto.volumenTotal -= cantidadEntregadaVolumen;


        if (producto.cantidadActual <= 10) {
            const estadoAgotado = await Estado.findOne({ where: { estadoName: 'AGOTADO' } });
            if (estadoAgotado) {
                producto.EstadoId = estadoAgotado.id;
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