const adminController = require("../controllers/admin")

module.exports = (application) => {
    application.get('/admin/login', adminController.login);
    
    application.post('/admin/autenticar', adminController.autenticar);

    application.get('/admin/editar_noticias', adminController.editar_noticias);

    application.get('/admin/formulario_inclusao_noticia', adminController.formulario_inclusao_noticia);
    
    application.post('/admin/noticias/salvar', adminController.noticias_salvar);
/*
    application.get('/admin/sair', (req, res) => {
        application.app.controllers.admin.sair(application, req, res);
    });
*/
}