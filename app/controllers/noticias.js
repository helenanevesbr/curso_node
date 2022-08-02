const NoticiasDAO = require("../models/NoticiasDAO")

module.exports.noticias = (application, req, res) => {


    NoticiasDAO.getNoticias( (error, result) => {

    //connection.query('select * from noticias', function (error, result) { /*query � uma fun��o (comando) que espera 2 coisas: o sql e uma fun��o de callback. SQL � a consulta ao banco de dados, callback � o que vai ser feito ap�s a consulta ser realizada.Especificamente sendo fun��o desse m�dulo, o callback espera 2 coisas: o erro e o resultado. Se der algum erro, conseguimos recuperar ele atrav�z dessa vari�vel.*/
        if (error) {
            res.send(error);
        } else {
            //res.send(result) iria cuspir o resultados recuperados do banco de dados na forma de json. Mas o interessante � criar uma view din�mica, ou seja: dentro da view, escrever c�digo javascript junto com a codifica��o est�tica html.
            res.render("noticias/noticias", { noticias: result }) /*"noticias/noticias" informa qual a view ir� renderizar o conet�do do banco de dados. O {noticias : result} � o json. Os results v�o ser recebidos na nossa view como se fosse uma vari�vel chamada "noticias".
                * Essa vari�vel vai se comportar como uma array. Exemplo: 2 linhas da tabela do banco de dados s�o o �ndice 1 e 2 da array -- [{titulo: "titulo da noticia", noticia:"conteudo da noticia"}, {titulo: "outra noticia", noticia:"conteudo da outra noticia"}]*/
        }
    });
}

module.exports.noticia = (application, req, res) => {

    var id_noticia = req.query;

    NoticiasDAO.getNoticia(id_noticia, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.render("noticias/noticia", { noticia: result })
        }
    });
}