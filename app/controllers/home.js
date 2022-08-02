const NoticiasDAO = require("../models/NoticiasDAO")


module.exports.index = (application, req, res) => {
    
    NoticiasDAO.get5UltimasNoticias( (error, result) => {
        res.render("home/index", {noticias : result});
    });
};