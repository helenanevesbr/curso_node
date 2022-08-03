// JavaScript source code
//Node � uma plataforma que executa c�digos javascript e o express � uma framework, uma camada que vai acima do node para fazer uma interface entre nossos scripts e o node.

const express = require('express'); //o require do m�dulo (aka biblioteca) do express retorna uma fun��o, mas n�o chama ela. Agora tem uma fun��o contida na vari�vel express.
const bodyParser = require('body-parser');

const expressValidator = require('express-validator');

const jwt = require('jsonwebtoken');
require("dotenv").config();
const SECRET = require('./token');
const cookieParser = require('cookie-parser');

const app = express(); //� necess�rio que chamemos a fun��o.
/*var msg = require('./mod_teste')();//sempre que um m�dulo retorna uma fun��o, � necess�rio que executemos essa fun��o (no caso basta "()" porque a fun��o � an�nima -- s� checar o c�digo dentro do arquivo mod_teste). Em var express e var app estamos fazendo a mesma coisa.
//como o m�dulo est� dentro do diret�rio curso_node, � boa pr�tica utilizar o "./" */

app.set('view engine', 'ejs');//Essa linha informa para o Express que seu engine (motor) de views passou a ser o m�dulo EJS. A propriedade que queremos ajustar do Express � o "view engine".
app.set('views', './app/views');//apontar diret�rio de views padr�o, onde o Express vai pesquisar as views. Propriedade: views. Parametro: ./app/views

console.log("Servidor correndo com EJS");

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(cookieParser())

app.use( (req, res, next) => {

    console.log(req.url, req.baseUrl)
    if (req.baseUrl.startsWith('/admin/login')) {
        next()
    } else if (req.baseUrl.startsWith('/admin/autenticar')) {
        next()
    } else if (req.baseUrl.startsWith('/admin/')) {
        jwt.verify(req.cookies.token, SECRET)
        next()
    } else {
        next()
    }
});

const homeRoute = require('../app/routes/home');
const adminRoute = require('../app/routes/admin');
const noticiasRoute = require('../app/routes/noticias');

homeRoute(app);
adminRoute(app)
noticiasRoute(app);

module.exports = app;