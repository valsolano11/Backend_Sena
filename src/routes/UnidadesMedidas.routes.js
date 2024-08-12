import express from 'express';
import { getAllUnits, getUnitById, handleConversion} from '../controllers/UnidadesMedida.controller.js';


const UnidadMedidaRouter = express.Router();

UnidadMedidaRouter.get('/units', getAllUnits);
UnidadMedidaRouter.get('/units/:id', getUnitById); 
UnidadMedidaRouter.post('/units',  handleConversion); 

export default UnidadMedidaRouter;
