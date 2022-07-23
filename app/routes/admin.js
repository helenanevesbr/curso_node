module.exports = function (application) {
    application.post('/noticias/salvar', function (req, res){
        application.app.controllers.admin.noticias_salvar(application, req, res);
    });

    application.get('/login', function (req, res) {
        application.app.controllers.admin.login(application, req, res);
    });
    
    application.post('/autenticar', function (req, res) {
        application.app.controllers.admin.autenticar(application, req, res);
    });

    application.get('/formulario_inclusao_noticia', function (req, res) {
        application.app.controllers.admin.formulario_inclusao_noticia(application, req, res);
    });

    application.get('/editar_noticias', function (req, res) {
        application.app.controllers.admin.editar_noticias(application, req, res);
    });
}