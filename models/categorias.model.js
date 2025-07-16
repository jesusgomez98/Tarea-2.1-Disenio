import db from '../config/db.js';

export async function obtenerCategorias() {
  const [rows] = await db.query('SELECT * FROM categorias');
  return rows;
}

export async function obtenerCategoriaPorId(id) {
  const [rows] = await db.query('SELECT * FROM categorias WHERE id = ?', [id]);
  return rows[0];
}

export async function crearCategoria(nombre) {
  const [resultado] = await db.query('INSERT INTO categorias(nombre) VALUES(?)', [nombre]);
  return resultado.insertId;
}

export async function actualizarCategoria(id, nombre) {
  await db.query('UPDATE categorias SET nombre = ? WHERE id = ?', [nombre, id]);
}

export async function eliminarCategoria(id) {
  await db.query('DELETE FROM categorias WHERE id = ?', [id]);
}

export async function existeCategoriaPorNombre(nombre) {
  const [rows] = await db.query('SELECT * FROM categorias WHERE nombre = ?', [nombre]);
  return rows.length > 0;
}
