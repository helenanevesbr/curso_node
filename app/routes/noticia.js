module.exports = function (app) {
    app.get('/noticia', function (req, res) {

        var connection = app.config.dbConnection();
        var noticiasModel = app.app.models.noticiasModel;//o primeiro app é para a variável desta função. Se na linha 1 estivesse module.exports = function (application), aqui seria application.app.models.noticiasModel

        //connection.query('select * from noticias where id_noticia = 2', function (error, result) {//consulta seleciona *tudo* de notícias, mas no apenas na parte onde o id_noticia = 2.
        noticiasModel.getNoticia(connection, function (error, result) {
            if (error) {
                res.send(error);
            } else {
                res.render("noticias/noticia", { noticias: result })
            }
        });
    });
}
