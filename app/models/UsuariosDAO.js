const dbConnection = require("../../config/dbConnection")

class UsuariosDAO{
	constructor(connection) {
		this._connection = connection;
	}

	autenticar(dadosLogin, callback) {
		console.log(dadosLogin)
		this._connection.query(`select * from usuarios_admin where usuario = '${dadosLogin.usuario}' and senha = '${dadosLogin.senha}'`, callback);
	}	
}


module.exports = new UsuariosDAO(dbConnection);