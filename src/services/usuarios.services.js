import Usuario from "../models/Usuario.js";
import ExcelFile from "../models/Excel.js";

export const createUser = async (userData) => {
  return await Usuario.create(userData);
};

export const bulkCreateUsers = async (usersData) => {
  return await Usuario.bulkCreate(usersData);
};

export const syncDatabase = async () => {
  await ExcelFile.sync();
  await Usuario.sync();
};
