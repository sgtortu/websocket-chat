const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const {
    agregarUsuario,
    traerUsuariosConectados 
} = require('./modulos/usuarios');
const {
    agregarMensaje,
    obtnerCantidaddeMensaje,
    obtenerMensajes
} = require('./modulos/mensajes');
 
//configuracion
app.set('port', process.env.PORT || 3000);

//archivos static::  la carpeta raiz donde el navegador obtendra sus recuros
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
    console.log('Server on port: ' + app.get('port'));
})

const io = socketIO(server);

// Cuando el cliente se conecta
io.on("connection", (socket) => {
    console.log('Nueva conexion ' + socket.id);

    // Guardo datos del usuario que se conecta
    socket.on('nuevo-usuario', (data_nombre) => {
        agregarUsuario(data_nombre.nombreForm, socket.id);
    });
    
    // (Probando) Listar usuarios conectados
    console.log('-->', traerUsuariosConectados());
    socket.emit ('usuarios-conectados', traerUsuariosConectados());

    // Enviar mensajes "viejos" para mostrar en el chat
    socket.emit('chat-mensaje', obtenerMensajes());

    // Recibir mensajes del chat
    socket.on("new-mensaje", (data) => {
        agregarMensaje(data);

        // Enviar mensaje para mostrar en el chat
        io.sockets.emit("chat-mensaje", obtenerMensajes());
    });

});
