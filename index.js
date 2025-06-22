
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


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
