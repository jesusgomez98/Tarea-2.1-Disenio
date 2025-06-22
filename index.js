
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
    return res.status(400).json({ error: 'El precio debe ser un numero positivo' });
  }
  if (!descripcion || descripcion.length < 10) {
    return res.status(400).json({ error: 'La descripcion debe tener al menos 10 caracteres' });
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



app.put('/productos/:id', (req, res) => {
  const productos = getProductos();
  const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));

  if (productoIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const { nombre, precio, descripcion, disponible } = req.body;

  if (nombre !== undefined) productos[productoIndex].nombre = nombre;
  if (precio !== undefined) {
    if (typeof precio !== 'number' || precio <= 0) {
      return res.status(400).json({ error: 'El precio debe ser un número positivo' });
    }
    productos[productoIndex].precio = precio;
  }
  if (descripcion !== undefined) {
    if (descripcion.length < 10) {
      return res.status(400).json({ error: 'La descripción debe tener al menos 10 caracteres' });
    }
    productos[productoIndex].descripcion = descripcion;
  }
  if (disponible !== undefined) productos[productoIndex].disponible = disponible;

  saveProductos(productos);
  res.json(productos[productoIndex]);
});


app.delete('/productos/:id', (req, res) => {
  let productos = getProductos();
  const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id));

  if (productoIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const productoEliminado = productos.splice(productoIndex, 1);
  saveProductos(productos);

  res.json({ mensaje: 'Producto eliminado', producto: productoEliminado[0] });
});


app.get('/productos/disponibles', (req, res) => {
  const productos = getProductos();
  const disponibles = productos.filter(p => p.disponible === true);
  res.json(disponibles);
});




app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

console.log("Servidor inciado")