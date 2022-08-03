const noticiasController = require("../controllers/noticias")

module.exports = (application) => {
    application.get('/noticias', noticiasController.noticias);

    application.get('/noticia', noticiasController.noticia);
}