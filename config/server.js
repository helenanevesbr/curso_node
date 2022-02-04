// JavaScript source code
//Node � uma plataforma que executa c�digos javascript e o express � uma framework, uma camada que vai acima do node para fazer uma interface entre nossos scripts e o node.

var express = require('express'); //o require do m�dulo (aka biblioteca) do express retorna uma fun��o, mas n�o chama ela. Agora tem uma fun��o contida na vari�vel express.
var app = express(); //� necess�rio que chamemos a fun��o.
/*var msg = require('./mod_teste')();//sempre que um m�dulo retorna uma fun��o, � necess�rio que executemos essa fun��o de retorno (no caso basta "()" porque a fun��o � an�nima, s� checar o c�digo dentro do arquivo mod_teste). Em var express e var app estamos fazendo a mesma coisa.
//como o m�dulo est� dentro do diret�rio curso_node, � boa pr�tica utilizar o "./"*/

app.set('view engine', 'ejs');//Essa linha informa para o Express que seu engine (motor) de views passou a ser o m�dulo EJS. A propriedade que queremos ajustar do Express � o "view engine".
app.set('views', './app/views');//apontar diret�rio de views padr�o, onde o Express vai pesquisar as views. Propriedade: views. Parametro: ./app/views

console.log("Servidor correndo com EJS");

module.exports = app;