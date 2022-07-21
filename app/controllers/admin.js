/*module.exports.formulario_inclusao_noticia = function(application, req, res){
    res.render("admin/form_add_noticia", {validacao: {}, noticia : {}});
}*/

module.exports.noticias_salvar = function(application, req, res){
    var noticia = req.body; //noticia é a variável que contém o json que será recuperado do body da nossa request
    //res.send(noticias); e esse json era exatamente o que aparecia quando essa função rodava. Ela rodava inseriamos algo no formulário e clicavamos em enviar.

    req.assert('titulo', 'Titulo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10,100);
    req.assert('autor', 'Autor é obrigatório').notEmpty();
    req.assert('data_noticia', 'Data é obrigatória').notEmpty().isDate({format: 'YYYY-MM-DD'});
    req.assert('noticia', 'Noticia é obrigatório').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.render("admin/form_add_noticia", {validacao : errors, noticia : noticia});
        return;
    }

    var connection = application.config.dbConnection();//app - vari�vel exportada pelo server.js. Gra�as ao consign, pode estabelecer conex�o com Data Base assim, como se estivesse navegando at� o diret�rio do arquivo dbConnection (perceba que em include.. then... into, estamos colocando config/dbConnection dentro de app)
    //colocamos dentro da rota (no app.get) para que a conex�o com o banco de dados seja acessada apenas somente quando essa rota for acessada, ou seja, apenas quando a p�gina que consome o banco de dados for requisitada.
    var noticiasModel = new application.app.models.NoticiasDAO(connection);

    noticiasModel.salvarNoticia(noticia, function (error, result) {//connection.query('select * from noticias', function (error, result) { /*query � uma fun��o (comando) que espera 2 coisas: o sql e uma fun��o de callback. SQL � a consulta ao banco de dados, callback � o que vai ser feito ap�s a consulta ser realizada.Especificamente sendo fun��o desse m�dulo, o callback espera 2 coisas: o erro e o resultado. Se der algum erro, conseguimos recuperar ele atrav�z dessa vari�vel.*/
        if (error) {
            res.send(error);
        } else {
            //res.send(result) iria cuspir o resultados recuperados do banco de dados na forma de json. Mas o interessante � criar uma view din�mica, ou seja: dentro da view, escrever c�digo javascript junto com a codifica��o est�tica html.
            res.redirect('/noticias');
        }
    });
}

module.exports.login = function(application, req, res){
    res.render("admin/login", {validacao: {}});
}

module.exports.autenticar = function(application, req, res){
    var dadosLogin = req.body;

    req.assert('usuario', 'Usuario não deve ser vazio').notEmpty();
    req.assert('senha', 'Senha não deve ser vazia').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.render("admin/login", {validacao : erros});
        return
    }

    var connection = application.config.dbConnection();
    var UsuariosDAO = new application.app.models.UsuariosDAO(connection);
    
    UsuariosDAO.autenticar(dadosLogin, function (error, result){
        console.log(result,typeof result)
        if (error) {
            res.status(401).send(error);
        }
        else {
            if (result.length !== 1){
                res.status(401).send("Usuario invalido")
            }
            else{
                res.render("admin/form_add_noticia", {validacao: {}, noticia : {}});
            }
        }
    });
}