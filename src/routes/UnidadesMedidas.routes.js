import express from 'express';
import { getAllUnits, getUnitById, convertir} from '../controllers/UnidadesMedida.controller.js';


const UnidadMedidaRouter = express.Router();

UnidadMedidaRouter.get('/units', getAllUnits);
UnidadMedidaRouter.get('/units/:id', getUnitById); 
UnidadMedidaRouter.post('/units',  convertir); 

export default UnidadMedidaRouter;
