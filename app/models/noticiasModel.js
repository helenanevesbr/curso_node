//models representam entidades do banco de dados. Cada model vai controlar uma tabela utilizada pela aplicação. Esse, por exemplo, representa a tabela noticias do meu banco de dados.
/*Por exemplo, noticia.js exibe uma noticia específica da tabela. Se eu quiser criar outra view mostrando essa notícia, teria que colocar no arquivo route dela 'select * from noticias where id_noticia = 2'. Agora posso simplismente colocar...
 * var noticiasModel = app.app.models.noticiasModel;
 * noticiasModel.getNoticia(connection,
 * ... e vir checar em noticiasModel qual parte do banco de dados está sendo consultada. Ou mesmo alterar a consulta apra todas as views de uma vez só em vez de precisar alterar o código em cada arquivo de rota.*/


module.exports = function () {

    this.getNoticias = function(connection, callback){
        connection.query('select * from noticias', callback);//getNoticias é função. Isso é o método wrapper que utilizamos para evitar que autoload do consign no server.js criasse uma conexão com o banco de dados cada vez que fosse a aplicação fosse rodada. Wrapper, no caso, está colocar uma função dentro de uma função, para que a primeira seja executada automaticamente, mas a segunda precise ser chamada assim: noticiasModel.getNoticias(connection,
    }

    this.getNoticia = function (connection, callback) {
        connection.query('select * from noticias where id_noticia = 2', callback);
    }

    return this;
}