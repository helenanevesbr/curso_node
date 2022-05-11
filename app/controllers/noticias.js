module.exports.noticias = function(application, req, res){
    var connection = application.config.dbConnection();//app - vari�vel exportada pelo server.js. Gra�as ao consign, pode estabelecer conex�o com Data Base assim, como se estivesse navegando at� o diret�rio do arquivo dbConnection (perceba que em include.. then... into, estamos colocando config/dbConnection dentro de app)
    //colocamos dentro da rota (no app.get) para que a conex�o com o banco de dados seja acessada apenas somente quando essa rota for acessada, ou seja, apenas quando a p�gina que consome o banco de dados for requisitada.
    var noticiasModel = new application.app.models.NoticiasDAO(connection);

    noticiasModel.getNoticias(function (error, result) {

    //connection.query('select * from noticias', function (error, result) { /*query � uma fun��o (comando) que espera 2 coisas: o sql e uma fun��o de callback. SQL � a consulta ao banco de dados, callback � o que vai ser feito ap�s a consulta ser realizada.Especificamente sendo fun��o desse m�dulo, o callback espera 2 coisas: o erro e o resultado. Se der algum erro, conseguimos recuperar ele atrav�z dessa vari�vel.*/
        if (error) {
            res.send(error);
        } else {
            //res.send(result) iria cuspir o resultados recuperados do banco de dados na forma de json. Mas o interessante � criar uma view din�mica, ou seja: dentro da view, escrever c�digo javascript junto com a codifica��o est�tica html.
            res.render("noticias/noticias", { noticias: result }) /*"noticias/noticias" informa qual a view ir� renderizar o conet�do do banco de dados. O {noticias : result} � o json. Os results v�o ser recebidos na nossa view como se fosse uma vari�vel chamada "noticias".
                * Essa vari�vel vai se comportar como uma array. Exemplo: 2 linhas da tabela do banco de dados s�o o �ndice 1 e 2 da array -- [{titulo: "titulo da noticia", noticia:"conteudo da noticia"}, {titulo: "outra noticia", noticia:"conteudo da outra noticia"}]*/
        }
    });
}

module.exports.noticia = function(application, req, res){
    var connection = application.config.dbConnection();
    var noticiasModel = new application.app.models.NoticiasDAO(connection);//o primeiro app � para a vari�vel desta fun��o. Se na linha 1 estivesse module.exports = function (application), aqui seria application.app.models.noticiasModel

    //connection.query('select * from noticias where id_noticia = 2', function (error, result) {//consulta seleciona *tudo* de not�cias, mas no apenas na parte onde o id_noticia = 2.
    noticiasModel.getNoticia(function (error, result) {
        if (error) {
            res.send(error);
        } else {
            res.render("noticias/noticia", { noticias: result })
        }
    });
}