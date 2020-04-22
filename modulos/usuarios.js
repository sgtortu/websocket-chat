const conectados = []; 

// Cuando se une un usuario
function agregarUsuario(username, socket_id) {
  const user = {  username, socket_id};
  conectados.push(user); 
}

// Usuarios conectados (probando)
function traerUsuariosConectados() {
  let usernames = []; 
  conectados.map(function (elem, index) {
    usernames.push(elem.username);
  })
  return usernames;
}

module.exports = {
  agregarUsuario,
  traerUsuariosConectados 
};
