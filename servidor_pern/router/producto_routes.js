// producto_routes.js
import Router from 'express-promise-router';
import { agregarProducto, modificarProducto, eliminarProducto, consultarProductoPorId, consultarTodosLosProductos, cargarProductos } from '../controllers/productoController.js';

const router = Router();

router.post('/productos', agregarProducto);
router.put('/productos/:id', modificarProducto);
router.delete('/productos/:id', eliminarProducto);
router.get('/productos', consultarProductoPorId);
router.get('/productos/todos', consultarTodosLosProductos);
router.post("/productos/cargar", cargarProductos);

export default router;

