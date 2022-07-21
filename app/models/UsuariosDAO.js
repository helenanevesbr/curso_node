function UsuariosDAO(connection){
	this._connection = connection;
}

UsuariosDAO.prototype.autenticar = function(dadosLogin, callback){
	console.log(dadosLogin)
    this._connection.query(`select * from usuarios_admin where usuario = '${dadosLogin.usuario}' and senha = '${dadosLogin.senha}'`, callback);
}

module.exports = function(){
	return UsuariosDAO;
}