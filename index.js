const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

/*Métodos:
- listarUsuarios(): Listar usuarios conectados.
- agregarUsuario(nombre,socket): Agregar usuario (nombre) (no se
permite usuarios con el mismo nombre) Tope 50 usuarios.
- borrarUsuario(socket): Quitar usuario (socket.id) (Funcion
utilizada para administracion)
- enviarMensaje(mensaje) Enviar Mensaje ala salda de chat
({usuario:'usuario', mensaje:'mensaje'}) Tope 500 mensajes por sala.
en caso de llegar al tope de mensajes borrar todos los mensajes y
comenzar de nuevo. solo los usuarios registrados en la sala
pueden enviar mensajes al chat.
- typing(usuario): Enviar evento de typing (usuario)
- obtenerMensajes() : obtiene todos los mensajes de la sala del chat.
*/

// --- Modulo --- //
let ModuloChat = {

    conectados: [{
        socket_id: 1,
        nombre: "La sala les dice"
    }],
    mensajes: [{
        id: 1,
        mensaje: "Bienvenidos al chat.",
        usuario: "La sala les dice"
    }],

    agregarUsuario: function (usuario) {
        this.conectados.push(usuario);
    },

    agregarMensaje: function (mensaje) {
        this.mensajes.push(mensaje);
    },

    obtnerCantidaddeMensaje: function () {
        return mensajes.length;
    }
};


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

    // Recibir nombre del que se unio al chat
    /* 
    socket.on("joinUser", (data_nombre) => {

        // revisar (no anda bien)
        ModuloChat.agregarUsuario([
            socket_id = socket.id,
            nombre = data_nombre
        ]);

        socket.emit('chat-mensaje', [{ 
            usuario: data_nombre,
            mensaje: 'se ha unido al chat.'
        }]);

    }); */ 

    // Enviar mensajes "viejos" para mostrar en el chat
    socket.emit('chat-mensaje', ModuloChat.mensajes);

    // Recibir mensajes del chat
    socket.on("new-mensaje", (data) => {
        ModuloChat.agregarMensaje(data);

        // Enviar mensaje para mostrar en el chat
        io.sockets.emit("chat-mensaje", ModuloChat.mensajes);
    });


});
