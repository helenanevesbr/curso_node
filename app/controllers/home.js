const NoticiasDAO = require("../models/NoticiasDAO")

class HomeController{
    index(req,res){
        NoticiasDAO.get5UltimasNoticias( (error, result) => {
            res.render("home/index", {noticias : result});
        });
    }
}

module.exports = new HomeController