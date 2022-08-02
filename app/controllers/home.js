const NoticiasDAO = require("../models/NoticiasDAO")


module.exports.index = (application, req, res) => {
    
    var connection = application.config.dbConnection();
    var noticiasModel = new NoticiasDAO(connection);

    noticiasModel.get5UltimasNoticias( (error, result) => {
        res.render("home/index", {noticias : result});
    });
};