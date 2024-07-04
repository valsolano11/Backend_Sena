import Estado from "../models/Estados.js";

/* export const cambiarEstado = (Model) => async (req,res) =>{
    try {
        const { id } = req.params;
        const { EstadoId } = req.body;

        const entity = await Model.findByPk(id);

        if(!entity){
            return res.status(400).json({
                message: `${Estado.name} no encontrado`
            })
        }

        const estado = await Estado.findByPk(EstadoId)
        
        if(!estado){
            return res.status(404).json({
                message: 'Estado no encontrado'
            })
        }
        entity.EstadoId = estadoId;
        await entity.save()

        return res.status(200).json({message: `El estado ${Model.name} esta bien`, entity})
    } catch (error) {
        console.error(`Error al cambiar el estado de ${Model.name}:`, error);
        res.status(500).json({ message: "Error interno del servidor" });
    }

} */

export const getEstados = async (req, res) => {
  try {
    const consultarEstado = await Estado.findAll();

    if (!consultarEstado) {
      return res.status(404).json({
        message: "Estado no encontrado",
      });
    }

    res.status(200).json(consultarEstado);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

