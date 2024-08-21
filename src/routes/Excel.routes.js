import { Router } from "express";
import upload from "../middlewares/upload.js"
import { getAllExcel, getExcel, } from "../controllers/Excel.controller.js";
import { uploadUsers } from "../controllers/Usuarios/usuario.controller.js";



const excelRouter = Router();


excelRouter.post("/upload", upload.single("file"), uploadUsers);
excelRouter.get("/upload", upload.single("file"), getAllExcel);
excelRouter.get("/upload/:id", upload.single("file"), getExcel);

export default excelRouter;