import XLSX from "xlsx";
import fs from "fs";
import path from "path";
import Historial_IF from "../../models/Historial_IF.js";
import Fichas from "../../models/Fichas.js";
import Instructores from "../../models/Instructores.js";

export const subirExcel = async (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "../../upload",
      req.file.filename
    );
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const registros = worksheet.map((row) => ({
      FichaId: row.FichaId,
      InstructorId: row.InstructorId,
      Trimestre: row.Trimestre,
      Fecha_carga: new Date(),
    }));

    await Historial_IF.bulkCreate(registros);

    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Datos cargados correctamente" });
  } catch (error) {
    console.error("Error al procesar el archivo Excel:", error);
    res.status(500).json({ message: "Error al procesar el archivo Excel" });
  }
};
