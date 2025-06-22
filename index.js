
const express = require('express');
const fs = require('fs');
const app = express();



const getProductos = () => {
  const data = fs.readFileSync('./productos.json', 'utf8');
  return JSON.parse(data);
};

const saveProductos = (productos) => {
  fs.writeFileSync('./productos.json', JSON.stringify(productos, null, 2));
};

const PORT = 3000;

app.use(express.json());

app.get('/productos', (req, res) => {
  const productos = getProductos();
  res.json(productos);
});

app.get('/productos/:id', (req, res) => {
  const productos = getProductos();
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(producto);
});

app.post('/productos', (req, res) => {
  const { nombre, precio, descripcion, disponible } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }
  if (typeof precio !== 'number' || precio <= 0) {
    return res.status(400).json({ error: 'El precio debe ser un número positivo' });
  }
  if (!descripcion || descripcion.length < 10) {
    return res.status(400).json({ error: 'La descripción debe tener al menos 10 caracteres' });
  }

  const productos = getProductos();
  const nuevoProducto = {
    id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
    nombre,
    precio,
    descripcion,
    disponible: Boolean(disponible),
    fecha_ingreso: new Date().toISOString()
  };

  productos.push(nuevoProducto);
  saveProductos(productos);

  res.status(201).json(nuevoProducto);
});



app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
