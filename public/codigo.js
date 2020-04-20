const socket = io();

// Cuando se conecta un usuario
// Obtener el username desde la URL
const datosUrl = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
let nombreForm = datosUrl.username;
// Envio el username
socket.emit('new-mensaje', {
    id: 0,
    mensaje: 'se ha unido.',
    usuario: nombreForm
})

// let btnaceptar = document.getElementById('btnaceptar'); 
let dmensaje = document.getElementById('chat-mensaje');
let mensajeForm = document.getElementById('mensaje');
let btnenviar = document.getElementById('btnenviar');

// Funcion para renderizar un mensaje
function render(data) {
    var html = data.map(function (elem, index) {
        return (`<div>
                <strong>${elem.usuario}</strong>:
                <em>${elem.mensaje}</em>
              </div>`);
    }).join(" ");
    dmensaje.innerHTML = html;
}

// Escuchar mensajes y mostrarlos
socket.on('chat-mensaje', function (data) {
    console.log(data);
    render(data);
})

// Btn enviar mensaje
btnenviar.addEventListener("click", () => {
    if (mensajeForm.value == '') {
        alert('Por favor ingrese un mensaje');
        return false;
    } else { 
        socket.emit('new-mensaje', {
            id: 0,
            mensaje: mensajeForm.value,
            usuario: nombreForm
        })
    }
})

