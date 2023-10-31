import { pool } from '../db.js';

export const agregarProducto = async (req, res, next) => {
  const { product_name, price, quanty, img } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO productos (product_name, price, quanty, img) VALUES ($1, $2, $3, $4) RETURNING *',
      [product_name, price, quanty, img]
    );

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const modificarProducto = async (req, res, next) => {
  const id = req.params.id;
  const { productName, price, quanty, img } = req.body;

  try {
    const result = await pool.query(
      'UPDATE productos SET productName = $1, price = $2, quanty = $3, img = $4 WHERE id = $5 RETURNING *',
      [productName, price, quanty, img, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const eliminarProducto = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado', producto: result.rows[0] });
  } catch (error) {
    next(error);
  }
};

export const consultarProductoPorId = async (req, res, next) => {
  const id = req.query.id;

  try {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const producto = result.rows[0];
    res.json(producto);
  } catch (error) {
    next(error);
  }
};

export const consultarTodosLosProductos = async (req, res, next) => {
  try {
    // Realizar una consulta SQL para recuperar todos los productos
    const result = await pool.query('SELECT * FROM productos');

    const productos = result.rows;
    res.json(productos);
  } catch (error) {
    next(error);
  }
};

export const cargarProductos = async (req, res, next) => {
  try {
    const { productos } = req.body; // Obtengo el array de productos
    // valido que productos sea un array
    if (!Array.isArray(productos)) {
      return res.status(400).json({ error: 'La carga debe ser un array de productos JSON' });
    }
    res.status(200).json({ message: 'Productos cargados exitosamente' });
  } catch (error) {
    next(error);
  }
};