const conectados = []; 

// Cuando se une un usuario
function agregarUsuario(username, socket_id) {
  const user = {  username, socket_id};
  conectados.push(user); 
}

// Usuarios conectados (probando)
function listarUsuarios() {
  let usernames = []; 
  conectados.map(function (elem, index) {
    usernames.push(elem.username);
  })
  return usernames;
}

 // Cuando un usuario sale del chat
function sacarUsuario(id) {
  const index = conectados.findIndex(username => username.socket_id === id);

  if (index !== -1) {
    return conectados.splice(index, 1)[0];
  }
}

// Borrar usuario (desde administracion)
function eliminarUsuario(nombre) {
  const index = conectados.findIndex(username => username.username === nombre);

  if (index !== -1) {
    return conectados.splice(index, 1)[0];
  }
}



module.exports = {
  agregarUsuario,
  listarUsuarios,
  sacarUsuario
};
