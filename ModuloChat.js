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
/*
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

    agregarUsuario: function (usuario, socket) {
        const usuario = { socket, usuario};
        conectados.push(usuario);
    },

    agregarMensaje: function (mensaje) {
        this.mensajes.push(mensaje);
    },

    obtnerCantidaddeMensaje: function () {
        return mensajes.length;
    }
};

*/