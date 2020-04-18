const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');

// --- Modulo --- //
let ModuloChat = {

    mensajes : [{
        id: 1,
        mensaje: "Bienvenidos al chat.",
        usuario: "La sala les dice"
    }],

    agregarMensaje: function  (mensaje) {
        this.mensajes.push(mensaje);
    },

    obtnerCantidaddeMensaje: function () {
        return mensajes.length;
    }
};
// ---  
let datosMensajes = ModuloChat;
// ---


//configuracion
app.set('port', process.env.PORT || 3000);

//archivos static::  la carpeta raiz donde el navegador obtendra sus recuros
app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(app.get('port'), () => {
    console.log('Server on port: ' + app.get('port'));
})

const io = socketIO(server);


io.on("connection", (socket) => {
    console.log('Nueva conexion ' + socket.id);


    //console.log('-->', datosMensajes.mensajes);
    socket.emit('chat-mensaje', datosMensajes.mensajes);

    socket.on("new-mensaje", (data) => {
        datosMensajes.agregarMensaje(data);
        io.sockets.emit("chat-mensaje", datosMensajes.mensajes);
        //le envio el mensaje a todoslos sockets conectados       
    });

});
