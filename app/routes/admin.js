module.exports = (application) => {
    application.post('/admin/noticias/salvar', (req, res) => {
        application.app.controllers.admin.noticias_salvar(application, req, res);
    });

    application.get('/admin/login', (req, res) => {
        application.app.controllers.admin.login(application, req, res);
    });
    
    application.post('/admin/autenticar', (req, res) => {
        application.app.controllers.admin.autenticar(application, req, res);
    });

    application.get('/admin/formulario_inclusao_noticia', (req, res) => {
        application.app.controllers.admin.formulario_inclusao_noticia(application, req, res);
    });

    application.get('/admin/editar_noticias', (req, res) => {
        application.app.controllers.admin.editar_noticias(application, req, res);
    });

    application.get('/admin/sair', (req, res) => {
        application.app.controllers.admin.sair(application, req, res);
    });
}