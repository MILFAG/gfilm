const express = require('express');
const app = express();
const PORT = 3000; // Puerto en el que se ejecutará el servidor

// Configurar middleware para procesar solicitudes JSON
app.use(express.json());

// Ruta para manejar la solicitud PUT
app.put('/enviar-imagen', (req, res) => {
    const imageUrl = req.body.imageUrl; // Obtener la URL de la imagen del cuerpo de la solicitud
    // Aquí puedes procesar la URL de la imagen, como guardarla en una base de datos o realizar otras acciones
    console.log('URL de la imagen recibida:', imageUrl);
    res.send('Imagen recibida exitosamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
