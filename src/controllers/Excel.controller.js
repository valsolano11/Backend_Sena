

import ExcelFile from "../models/Excel";

    
export const getAllExcel = async (req, res) => {
    try {
        const consultarExcel = await ExcelFile.findAll({
            atributes: null,
        });
    
        res.status(200).json(consultarExcel);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const getExcel = async (req, res) => {
    try {
        const consultarExcel = await ExcelFile.findByPk(req.params.id);

        if (!consultarExcel) {
        return res.status(404).json({
            message: "Excel no encontrado",
        });
        }

        res.status(200).json(consultarExcel);
    } catch (error) {
        res.status(500).json(error.message);
    }
};
