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
    socket.emit('lista-conectados', traerUsuariosConectados());

    // Guardo datos del usuario que se conecta
    socket.on('nuevo-usuario', (data_nombre) => {

        let usernames = traerUsuariosConectados();
               
        if (usernames.indexOf(data_nombre.nombreForm) == -1) {
            agregarUsuario(data_nombre.nombreForm, socket.id);
            socket.emit('aceptar-acceso', data_nombre.nombreForm);
            socket.emit('lista-conectados', usernames);
        } else {
            console.log('Ya en uso -> ', data_nombre.nombreForm);
            socket.emit('denegar-acceso', data_nombre.nombreForm);
        }

    });


    socket.emit('lista-conectados', traerUsuariosConectados());

    // Enviar mensajes "viejos" para mostrar en el chat
    socket.emit('chat-mensaje', obtenerMensajes()); 

    // Recibir mensajes del chat
    socket.on("new-mensaje", (data) => {
        agregarMensaje(data);

        // Enviar mensaje para mostrar en el chat
        io.sockets.emit("chat-mensaje", obtenerMensajes());
    });

});
