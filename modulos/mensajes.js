const mensajes = []; 

function agregarMensaje(mensaje) {
    mensajes.push(mensaje);
}

function obtnerCantidaddeMensaje() {
    return mensajes.length;
}

function obtenerMensajes() {
    return mensajes;
}

module.exports = {
    agregarMensaje,
    obtnerCantidaddeMensaje,
    obtenerMensajes
}; 