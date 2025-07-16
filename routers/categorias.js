import express from 'express';
import {
  obtenerCategorias,
  // otras funciones
} from '../controllers/categoriasController.js';

const router = express.Router();

router.get('/', obtenerCategorias);
// Agrega los demás endpoints

export default router;
