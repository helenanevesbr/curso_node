module.exports = function (application) {
    application.post('/noticias/salvar', function (req, res){
        application.app.controllers.admin.noticias_salvar(application, req, res);
    });

    application.get('/login', function (req, res) {
        application.app.controllers.admin.login(application, req, res);
    });
    application.post('/formulario_inclusao_noticia', function (req, res) {
        application.app.controllers.admin.autenticar(application, req, res);
    });
}