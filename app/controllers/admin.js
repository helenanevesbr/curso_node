var jwt = require('jsonwebtoken');
const NoticiasDAO = require("../models/NoticiasDAO")
const UsuariosDAO = require("../models/UsuariosDAO")
const SECRET = require("../../config/token")

module.exports.noticias_salvar = (application, req, res) => {
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


    NoticiasDAO.salvarNoticia(noticia, (error, result) => {//connection.query('select * from noticias', function (error, result) { /*query � uma fun��o (comando) que espera 2 coisas: o sql e uma fun��o de callback. SQL � a consulta ao banco de dados, callback � o que vai ser feito ap�s a consulta ser realizada.Especificamente sendo fun��o desse m�dulo, o callback espera 2 coisas: o erro e o resultado. Se der algum erro, conseguimos recuperar ele atrav�z dessa vari�vel.*/
        if (error) {
            res.send(error);
        } else {
            //res.send(result) iria cuspir o resultados recuperados do banco de dados na forma de json. Mas o interessante � criar uma view din�mica, ou seja: dentro da view, escrever c�digo javascript junto com a codifica��o est�tica html.
            res.redirect('/noticias');
        }
    });
}

module.exports.login = (application, req, res) => {
    res.render("admin/login", {validacao: {}});
}

module.exports.autenticar = (application, req, res) =>{
    var dadosLogin = req.body;

    req.assert('usuario', 'Usuario não deve ser vazio').notEmpty();
    req.assert('senha', 'Senha não deve ser vazia').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.render("admin/login", {validacao : erros});
        return
    }
    
    UsuariosDAO.autenticar(dadosLogin, (error, result) => {
        if (error) {
            res.status(401).send(error);
        }
        else {
            if (result.length !== 1){
                res.status(500).send("Usuario invalido")
            }
            else{
                var id = result[0].id_usuario
                var nomeDoUsuario =  result[0].nome_do_usuario

                var token = jwt.sign({ id , nomeDoUsuario}, SECRET, {
                    expiresIn: 300
                });

                res.cookie('token', token, {
                    maxAge: 60*1000,
                });
                return res.redirect("/admin/editar_noticias");
            }
        }
    });
}

module.exports.formulario_inclusao_noticia = (application, req, res) => {
    res.render("admin/form_add_noticia", {validacao: {}, noticia : {}});
}

module.exports.editar_noticias = (application, req, res) => {

    NoticiasDAO.getNoticias( (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.render("admin/edit_noticias", { noticias: result });
        }
    });
}

module.exports.sair = (application, req, res) => {
    req.session.destroy( (err) => {

        NoticiasDAO.get5UltimasNoticias( (error, result) => {
            res.render("home/index", {noticias : result});
        });
    });
}