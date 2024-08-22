import Producto from "../models/Productos.js";
import Usuario from "../models/Usuario.js";
import Subcategoria from "../models/Subcategoria.js";
import Estado from "../models/Estados.js";
import UnidadMedida from "../models/UnidadesMedidas.js";
import { Op } from "sequelize";

export const crearProductos = async (req, res) => {
    try {
        const { nombre, codigo, descripcion, cantidadEntrada, volumen, marca, UsuarioId, EstadoId, SubcategoriaId, UnidadMedidaId } = req.body;


        const consultaNombre = await Producto.findOne({ where: { [Op.or]: [{ nombre }] } });
        if (consultaNombre) {
            return res.status(400).json({ error: 'El nombre del producto ya existe' });
        }

        const consultaCodigo = await Producto.findOne({ where: { [Op.or]: [{ codigo }] } });
        if (consultaCodigo) {
            return res.status(400).json({ error: 'El código del producto ya existe' });
        }


        const consultaUsuario = await Usuario.findByPk(UsuarioId);
        if (!consultaUsuario) {
            return res.status(400).json({ message: "El usuario especificado no existe" });
        }
        
        const consultaUnidad = await UnidadMedida.findByPk(UnidadMedidaId);
        if (!consultaUnidad) {
            return res.status(400).json({ message: "La unidad de medida especificada no existe" });
        }
        
        const consultaSubcategoria = await Subcategoria.findByPk(SubcategoriaId);
        if (!consultaSubcategoria) {
            return res.status(400).json({ message: "La subcategoría especificada no existe" });
        }
        
        const consultaEstado = await Estado.findByPk(EstadoId);
        if (!consultaEstado) {
            return res.status(400).json({ message: "El estado especificado no existe" });
        }


        const cantidadSalida = 0;
        const cantidadActual = cantidadEntrada;


        let estadoIdActual = EstadoId;
        if (cantidadActual === 0) {
            const estadoInactivo = await Estado.findOne({ where: { estadoName: 'INACTIVO' } });
            if (estadoInactivo) {
                estadoIdActual = estadoInactivo.id;
            }
        }

        const volumenTotal = cantidadActual * volumen;


        const producto = await Producto.create({
            nombre,
            codigo,
            descripcion,
            cantidadEntrada,
            cantidadSalida,
            cantidadActual,
            volumen,
            volumenTotal,
            marca,
            UsuarioId,
            UnidadMedidaId,
            SubcategoriaId,
            EstadoId: estadoIdActual
        });

        res.status(201).json(producto);
    } catch (error) {
        console.error("Error al crear el producto", error);
        res.status(500).json({ message: error.message });
    }
};






































export const getAllProductos = async (req, res) => {
    try {
        let consultaProducto = await Producto.findAll({
            attributes: null,
            include: [
                { model: Usuario, attributes: ['nombre',] },
                { model: Subcategoria, attributes: ['subcategoriaName'] },
                { model: Estado, attributes: ['estadoName'] },
                { model: UnidadMedida, attributes: ['nombre'] },
            ]
        });
        res.status(200).json(consultaProducto);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

export const getProductos = async (req, res) => {
    try {
        let consultaProducto = await Producto.findByPk(req.params.id);

        if(!consultaProducto){
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.status(200).json(consultaProducto)
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

export const putProductos = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, codigo, descripcion, cantidadEntrada, marca, UsuarioId, UnidadMedidaId, SubcategoriaId, EstadoId } = req.body;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        if (nombre && nombre !== producto.nombre) {
            const existingProductoNombre = await Producto.findOne({ where: { nombre } });
            if (existingProductoNombre) {
                return res.status(400).json({ error: 'El nombre del producto ya existe' });
            }
        }

        if (codigo && codigo !== producto.codigo) {
            const existingProductoCodigo = await Producto.findOne({ where: { codigo } });
            if (existingProductoCodigo) {
                return res.status(400).json({ error: 'El código del producto ya existe' });
            }
        }

        if (descripcion && descripcion.trim() === '') {
            return res.status(400).json({ error: 'La descripción no puede estar vacía' });
        }

        if (UsuarioId) {
            const usuario = await Usuario.findByPk(UsuarioId);
            if (!usuario) {
                return res.status(400).json({ error: 'El UsuarioId no existe' });
            }
        }

        if (UnidadMedidaId) {
            const unidadMedida = await UnidadMedida.findByPk(UnidadMedidaId);
            if (!unidadMedida) {
                return res.status(400).json({ error: 'El UnidadMedidaId no existe' });
            }
        }

        if (SubcategoriaId) {
            const subcategoria = await Subcategoria.findByPk(SubcategoriaId);
            if (!subcategoria) {
                return res.status(400).json({ error: 'El SubcategoriaId no existe' });
            }
        }

        if (EstadoId) {
            const estado = await Estado.findByPk(EstadoId);
            if (!estado) {
                return res.status(400).json({ error: 'El EstadoId no existe' });
            }
        }

        if (cantidadEntrada !== undefined) {
            producto.cantidadEntrada = cantidadEntrada;
            producto.cantidadSalida = 0;
            producto.cantidadActual = cantidadEntrada;
        }

        producto.nombre = nombre !== undefined ? nombre : producto.nombre;
        producto.codigo = codigo !== undefined ? codigo : producto.codigo;
        producto.descripcion = descripcion !== undefined ? descripcion : producto.descripcion;
        producto.marca = marca !== undefined ? marca : producto.marca;
        producto.UsuarioId = UsuarioId !== undefined ? UsuarioId : producto.UsuarioId;
        producto.UnidadMedidaId = UnidadMedidaId !== undefined ? UnidadMedidaId : producto.UnidadMedidaId;
        producto.SubcategoriaId = SubcategoriaId !== undefined ? SubcategoriaId : producto.SubcategoriaId;
        producto.EstadoId = EstadoId !== undefined ? EstadoId : producto.EstadoId;


        await producto.save();
        res.json(producto);
    } catch (error) {
        console.error("Error al actualizar el producto", error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};