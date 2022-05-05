// JavaScript source code
//Node é uma plataforma que executa códigos javascript e o express é uma framework, uma camada que vai acima do node para fazer uma interface entre nossos scripts e o node.

var express = require('express'); //o require do módulo (aka biblioteca) do express retorna uma função, mas não chama ela. Agora tem uma função contida na variável express.
var consign = require('consign'); //recuperando módulo
var bodyParser = require('body-parser');

var app = express(); //é necessário que chamemos a função.
/*var msg = require('./mod_teste')();//sempre que um módulo retorna uma função, é necessário que executemos essa função (no caso basta "()" porque a função é anônima -- só checar o código dentro do arquivo mod_teste). Em var express e var app estamos fazendo a mesma coisa.
//como o módulo está dentro do diretório curso_node, é boa prática utilizar o "./" */

app.set('view engine', 'ejs');//Essa linha informa para o Express que seu engine (motor) de views passou a ser o módulo EJS. A propriedade que queremos ajustar do Express é o "view engine".
app.set('views', './app/views');//apontar diretório de views padrão, onde o Express vai pesquisar as views. Propriedade: views. Parametro: ./app/views

console.log("Servidor correndo com EJS");

app.use(bodyParser.urlencoded({extended: true}));

consign()//aqui está chamando a função criada na linha var consign = require('consign');
    .include('app/routes')//include também é uma função. Diretório que quer incluir no servidor é um parâmetro.
    .then('config/dbConnection.js')//para não ter que digitar um require('../../config/dbConnection') em cada arquivo da pasta rota.
    //Se você não apontar a extensão do arquivo-- .js.O consign entenderia que dbConnection não é um módulo, mas um subdiretório da pasta config.
    .then('app/models')
    .into(app); //função include do consign faz o seguinte: executa um scam no diretório app/routes, recupera e inicializa os módulos dentro dele e atribui isso a variável app. Essa variável vai ser parâmetro (ou argumento)? da função export de muitos módulos (vários arquivos começam com module.exports = function (app)). Ou seja, todas as rotas, conexão com banco de dados e models estão carregados dentro variável app e atravéz dela os módulo tem condições de acessar qualquer rota, model e etc. Mas geralmente para de fato acessar, a rota/model/etc é atribuído a uma variável. Ex: ´rota noticia.js ---> var noticiasModel = app.app.models.noticiasModel;
    //O consign pode fazer auto - load não apenas de rotas, mas também de arquivos de configração, de controles, etc...

module.exports = app;//o módulo do servidor agora está exportando o app, que engloba o express, o ejs e todos os módulos incluídos atravéz do consign. Espera que na função exportada por cada arquivo de consign (No caso 'app/routes' e 'config/dbConnection.js') que seu primeiro parametro seja "app", mas não é necessário.