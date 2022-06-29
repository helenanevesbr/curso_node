function NoticiasDAO(connection){
    this._connection = connection;
}

NoticiasDAO.prototype.getNoticias = function(callback){
    this._connection.query('select * from noticias order by data_criacao desc', callback);
}

NoticiasDAO.prototype.getNoticia = function(id_noticia, callback) {
    this._connection.query('select * from noticias where id_noticia = ' + id_noticia.id_noticia, callback);
}

NoticiasDAO.prototype.salvarNoticia = function(noticia, callback){
    this._connection.query('insert into noticias set ? ', noticia, callback)
}

NoticiasDAO.prototype.get5UltimasNoticias = function(callback){
    this._connection.query('select * from noticias order by data_criacao desc limit 5', callback);
}

//models representam entidades do banco de dados. Cada model vai controlar uma tabela utilizada pela aplica��o. Esse, por exemplo, representa a tabela noticias do meu banco de dados.
/*Por exemplo, noticia.js exibe uma noticia espec�fica da tabela. Se eu quiser criar outra view mostrando essa not�cia, teria que colocar no arquivo route dela 'select * from noticias where id_noticia = 2'. Agora posso simplismente colocar...
 * var noticiasModel = app.app.models.noticiasModel;
 * noticiasModel.getNoticia(connection,
 * ... e vir checar em noticiasModel qual parte do banco de dados est� sendo consultada. Ou mesmo alterar a consulta apra todas as views de uma vez s� em vez de precisar alterar o c�digo em cada arquivo de rota.*/

module.exports = function () {

    /*this.getNoticias = function(connection, callback){
        connection.query('select * from noticias', callback);//getNoticias � fun��o. Isso � o m�todo wrapper que utilizamos para evitar que autoload do consign no server.js criasse uma conex�o com o banco de dados cada vez que fosse a aplica��o fosse rodada. Wrapper, no caso, est� colocar uma fun��o dentro de uma fun��o, para que a primeira seja executada automaticamente, mas a segunda precise ser chamada assim: noticiasModel.getNoticias(connection,
    }

    this.getNoticia = function (connection, callback) {
        connection.query('select * from noticias where id_noticia = 2', callback);
    }

    this.salvarNoticia = function(noticia, connection, callback){
        connection.query('insert into noticias set ? ', noticia, callback) //pega o json dentro da variável noticia, gera uma string, pega essa string e substitui o ponto de interrogação dentro da outra string por ela.
    }*/

    return NoticiasDAO;
}