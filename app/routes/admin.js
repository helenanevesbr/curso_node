module.exports = function (application) {
    application.get('/formulario_inclusao_noticia', function (req, res) {
        if (process.env.ADMIN_ENABLED === 'true'){
            application.app.controllers.admin.formulario_inclusao_noticia(application, req, res);
        }
        else{
        res.status(404).end('Page is unavailable')
        }
    });
    application.post('/noticias/salvar', function (req, res){
        application.app.controllers.admin.noticias_salvar(application, req, res);
    });

    application.get('/login', function (req, res) {
        application.app.controllers.admin.login(application, req, res);
    });
    application.post('/autenticar', function (req, res) {
        application.app.controllers.admin.autenticar(application, req, res);
    });
}