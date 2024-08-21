import Pedido from "../models/Pedido.js";
import Producto from "../models/Productos.js";
import Instructores from "../models/Instructores.js";
import Fichas from "../models/Fichas.js";
import Usuario from "../models/Usuario.js";
import Estado from "../models/Estados.js";
import convert from 'convert-units';

export const crearPedido = async (req, res) => {
    try {
        const { cantidadSolicitada, cantidadEntregada, UsuarioId, InstructorId, fichaId, ProductoId, toUnit, EstadoId } = req.body;

        // Validación de campos...
        const producto = await Producto.findByPk(ProductoId);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const unidadMedidaProducto = await UnidadMedida.findByPk(producto.UnidadMedidaId);
        if (!unidadMedidaProducto) {
            return res.status(404).json({ error: 'Unidad de medida del producto no encontrada' });
        }
        const fromUnit = unidadMedidaProducto.nombre; 

        // Si la unidad de destino es diferente de la unidad de origen, realiza la conversión.
        const cantidadEntregadaConvertida = fromUnit === toUnit
            ? cantidadEntregada
            : convert(cantidadEntregada).from(fromUnit).to(toUnit);

        const cantidadSolicitadaConvertida = fromUnit === toUnit
            ? cantidadSolicitada
            : convert(cantidadSolicitada).from(fromUnit).to(toUnit);

        // Validación de cantidades...
        const cantidadDisponible = producto.cantidadActual;
        const cantidadAEntregar = Math.min(cantidadEntregadaConvertida, cantidadDisponible);

        const pedido = await Pedido.create({
            ProductoId,
            cantidadSolicitada: cantidadSolicitadaConvertida,
            cantidadEntregada: cantidadAEntregar,
            fechaPedido: new Date(),
            codigo: producto.codigo,  
            UsuarioId,
            InstructorId,
            fichaId,
            EstadoId,
            UnidadMedidaId: producto.UnidadMedidaId
        });

        // Actualizar el inventario del producto con la conversión
        producto.cantidadSalida += cantidadAEntregar;
        producto.cantidadActual -= cantidadAEntregar;

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





export const crearPedidoejemplo = async (req, res) => {
    const { productoId, cantidadSolicitada, unidadMedidaSolicitadaId, unidadMedidaEntregadaId } = req.body;

    try {
        // Obtener el producto y las unidades
        const producto = await Producto.findByPk(productoId);
        const unidadOrigen = await UnidadDeMedida.findByPk(producto.UnidadDeMedidaId);
        const unidadDestino = await UnidadDeMedida.findByPk(unidadMedidaSolicitadaId);

        // Convertir la cantidad solicitada a la unidad del producto
        const cantidadSolicitadaEnUnidadProducto = convertirUnidad(cantidadSolicitada, unidadDestino.sigla, unidadOrigen.sigla);

        if (producto.volumenTotalActual < cantidadSolicitadaEnUnidadProducto) {
            return res.status(400).json({ error: 'No hay suficiente cantidad disponible en el inventario.' });
        }

        // Actualizar el volumen total actual y cantidad de contenedores
        producto.volumenTotalActual -= cantidadSolicitadaEnUnidadProducto;
        producto.cantidadContenedoresActual = Math.ceil(producto.volumenTotalActual / producto.volumenPorContenedor);

        await producto.save();

        // Crear el pedido
        const nuevoPedido = await Pedido.create({
            productoId,
            codigoProducto: producto.codigo,
            cantidadSolicitada,
            unidadMedidaSolicitadaId,
            cantidadEntregada: cantidadSolicitada,
            unidadMedidaEntregadaId: unidadMedidaSolicitadaId,
            cantidadContenedoresSolicitados: Math.ceil(cantidadSolicitadaEnUnidadProducto / producto.volumenPorContenedor),
            cantidadContenedoresEntregados: Math.ceil(cantidadSolicitadaEnUnidadProducto / producto.volumenPorContenedor),
            estado: 'completado',
        });

        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(400).json({ error: error.message });
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