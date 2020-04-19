const socket = io();

socket.emit('saludar', { //prueba si funciona el socket
    mensaje: ' Saludo desde el Navegador!!!'
});

socket.on('confirmarsaludo', (dato) => {
    console.log(dato.mensaje);
})

socket.on('nuevaconexion', (data) => {
    console.log(data.mensaje);
})

let dmensaje = document.getElementById('chat-mensaje');
let mensajeForm = document.getElementById('mensaje');
let nombreForm = document.getElementById('username');
let btnenviar = document.getElementById('btnenviar');
let btnaceptar = document.getElementById('btnaceptar');

socket.on('chat-mensaje', function (data) {
    console.log(data);
    render(data);
})

function render(data) {
    var html = data.map(function (elem, index) {
        return (`<div>
                <strong>${elem.usuario}</strong>:
                <em>${elem.mensaje}</em>
              </div>`);
    }).join(" ");

    dmensaje.innerHTML = html;
}
 
btnaceptar.addEventListener("click", () => {

    if (nombreForm.value == '') {
        alert('Por favor ingrese su nombre');
        return false;
    }else{
        mensajeForm.disabled = false;
        btnenviar.disabled = false;
        nombreForm.disabled = true;
        btnaceptar.disabled = true;
        // Cuando alguien se une 
        socket.emit('new-mensaje', {
            mensaje: "se ha unido al chat",
            usuario: nombreForm.value
        }); 
    }

})

btnenviar.addEventListener("click", () => {

    if (mensajeForm.value == '') {
        alert('Por favor ingrese un mensaje');
        return false;
    };
    if (nombreForm.value == '') {
        alert('Por favor ingrese su nombre');
        return false;
    };

    socket.emit('new-mensaje', {
        id: 0,
        mensaje: mensajeForm.value,
        usuario: nombreForm.value
    })
    //mensaje.value='';
})

