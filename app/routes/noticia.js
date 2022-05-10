module.exports = function (application) {
    application.get('/noticia', function (req, res) {

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
    });
}
