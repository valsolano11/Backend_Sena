
import xlsx from "xlsx";

const parseExcel = (filePath, expectedFields) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);


    if (data.length > 0) {
      const firstRow = data[0];
      const missingFields = expectedFields.filter(field => !(field in firstRow));

      if (missingFields.length > 0) {
        throw new Error(`Faltan los siguientes campos en el archivo: ${missingFields.join(', ')}`);
      }
    }

    return data;
  } catch (error) {
    throw new Error("Error al leer el archivo Excel: " + error.message);
  }
};

export default parseExcel;

