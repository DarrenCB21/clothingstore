const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Crear la aplicación Express
const app = express();

// Middleware para manejar JSON
app.use(express.json());
app.use(cors());  // Habilita CORS para permitir peticiones desde tu frontend

// Configurar conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',  // Cambia si tu MySQL está en otro host
  user: 'root',  // El usuario de MySQL
  password: '',  // La contraseña de MySQL
  database: ''  // Nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener todos los productos
app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM productos'; // Asumiendo que la tabla se llama 'productos'
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).send('Error al obtener productos');
    }
    res.json(results);  // Devuelve los productos en formato JSON
  });
});

// Ruta para eliminar un producto
app.delete('/api/productos/eliminar/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM productos WHERE id = ?';  // Asumiendo que la columna ID es 'id'
  
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).send('Error al eliminar producto');
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    
    res.send({ message: 'Producto eliminado correctamente' });
  });
});

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
  console.log('Servidor corriendo en http://localhost:8080');
});
