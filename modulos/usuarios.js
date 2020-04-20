const conectados = []; 

// Cuando se une un usuario
function agregarUsuario(username, socket_id) {
  const user = {  username, socket_id};
  conectados.push(user);
  return user;
}

// Usuarios conectados (probando)
function traerUsuariosConectados() {
  return conectados;
}

module.exports = {
  agregarUsuario,
  traerUsuariosConectados 
};
