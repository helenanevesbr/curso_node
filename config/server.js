// JavaScript source code
//Node � uma plataforma que executa c�digos javascript e o express � uma framework, uma camada que vai acima do node para fazer uma interface entre nossos scripts e o node.

var express = require('express'); //o require do m�dulo (aka biblioteca) do express retorna uma fun��o, mas n�o chama ela. Agora tem uma fun��o contida na vari�vel express.
var consign = require('consign'); //recuperando m�dulo
var bodyParser = require('body-parser');
var expressValidator = require('express-validator')

var app = express(); //� necess�rio que chamemos a fun��o.
/*var msg = require('./mod_teste')();//sempre que um m�dulo retorna uma fun��o, � necess�rio que executemos essa fun��o (no caso basta "()" porque a fun��o � an�nima -- s� checar o c�digo dentro do arquivo mod_teste). Em var express e var app estamos fazendo a mesma coisa.
//como o m�dulo est� dentro do diret�rio curso_node, � boa pr�tica utilizar o "./" */

app.set('view engine', 'ejs');//Essa linha informa para o Express que seu engine (motor) de views passou a ser o m�dulo EJS. A propriedade que queremos ajustar do Express � o "view engine".
app.set('views', './app/views');//apontar diret�rio de views padr�o, onde o Express vai pesquisar as views. Propriedade: views. Parametro: ./app/views

console.log("Servidor correndo com EJS");

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());


const consignConfig = process.env.HEROKU  ? {cwd: process.cwd()+"/app"} : {};

consign(consignConfig)//aqui est� chamando a fun��o criada na linha var consign = require('consign');
    .include('app/routes')//include tamb�m � uma fun��o. Diret�rio que quer incluir no servidor � um par�metro.
    .then('config/dbConnection.js')//para n�o ter que digitar um require('../../config/dbConnection') em cada arquivo da pasta rota.
    //Se voc� n�o apontar a extens�o do arquivo-- .js.O consign entenderia que dbConnection n�o � um m�dulo, mas um subdiret�rio da pasta config.
    .then('app/models')
    .then('app/controllers')
    .into(app); //fun��o include do consign faz o seguinte: executa um scam no diret�rio app/routes, recupera e inicializa os m�dulos dentro dele e atribui isso a vari�vel app. Essa vari�vel vai ser par�metro (ou argumento)? da fun��o export de muitos m�dulos (v�rios arquivos come�am com module.exports = function (app)). Ou seja, todas as rotas, conex�o com banco de dados e models est�o carregados dentro vari�vel app e atrav�z dela os m�dulo tem condi��es de acessar qualquer rota, model e etc. Mas geralmente para de fato acessar, a rota/model/etc � atribu�do a uma vari�vel. Ex: �rota noticia.js ---> var noticiasModel = app.app.models.noticiasModel;
    //O consign pode fazer auto - load n�o apenas de rotas, mas tamb�m de arquivos de configra��o, de controles, etc...

module.exports = app;//o m�dulo do servidor agora est� exportando o app, que engloba o express, o ejs e todos os m�dulos inclu�dos atrav�z do consign. Espera que na fun��o exportada por cada arquivo de consign (No caso 'app/routes' e 'config/dbConnection.js') que seu primeiro parametro seja "app", mas n�o � necess�rio.