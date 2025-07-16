
export const obtenerCategorias = (req, res) => {
  res.json({ mensaje: "Aquí irán las categorías" });
};



export const obtenerCategoria = (req, res) => {
  res.json({ mensaje: "Aquí se mostrarán categorías desde MySQL" });
};

export const obtenerCategoriaPorId = (req, res) => {
  const id = req.params.id;
  res.json({ mensaje: `Categoría con ID ${id}` });
};

export const crearCategoria = (req, res) => {
  const { nombre } = req.body;
  if (!nombre) return res.status(400).json({ error: "Nombre requerido" });
  res.status(201).json({ mensaje: "Categoría creada (simulada)", nombre });
};

export const actualizarCategoria = (req, res) => {
  const id = req.params.id;
  const { nombre } = req.body;
  res.json({ mensaje: `Categoría ${id} actualizada (simulada)`, nombre });
};

export const eliminarCategoria = (req, res) => {
  const id = req.params.id;
  res.json({ mensaje: `Categoría ${id} eliminada (simulada)` });
};
