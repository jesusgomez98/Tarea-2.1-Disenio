import express from 'express';
import categoriasRoutes from './routes/categorias.js';
import productosRoutes from './routes/productosrouters.js'; 

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡API funcionando correctamente!');
});

app.use('/categorias', categoriasRoutes);
app.use('/productos', productosRoutes); // solo si ya lo creaste

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
app.use('/categorias', categoriasRoutes);
