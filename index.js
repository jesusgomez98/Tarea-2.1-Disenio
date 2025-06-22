
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

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
