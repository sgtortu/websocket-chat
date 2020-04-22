const listMensaje = []; 

function agregarMensaje(mensaje) {
    listMensaje.push(mensaje);
}

function obtnerCantidaddeMensaje() {
    return listMensaje.length;
}

function obtenerMensajes() {
    return listMensaje;
}

function borrarMensajes() { 
    listMensaje.splice(0, listMensaje.length);
} 

module.exports = {
    agregarMensaje,
    obtnerCantidaddeMensaje,
    obtenerMensajes,
    borrarMensajes
}; 