import xlsx from "xlsx";

const parseExcel = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    return data;
  } catch (error) {
    throw new Error("Error al leer el archivo Excel: " + error.message);
  }
};

export default parseExcel;
