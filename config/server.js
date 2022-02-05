// JavaScript source code
//Node é uma plataforma que executa códigos javascript e o express é uma framework, uma camada que vai acima do node para fazer uma interface entre nossos scripts e o node.

var express = require('express'); //o require do módulo (aka biblioteca) do express retorna uma função, mas não chama ela. Agora tem uma função contida na variável express.
var consign = require('consign'); //recuperando módulo

var app = express(); //é necessário que chamemos a função.
/*var msg = require('./mod_teste')();//sempre que um módulo retorna uma função, é necessário que executemos essa função de retorno (no caso basta "()" porque a função é anônima -- só checar o código dentro do arquivo mod_teste). Em var express e var app estamos fazendo a mesma coisa.
//como o módulo está dentro do diretório curso_node, é boa prática utilizar o "./"*/

app.set('view engine', 'ejs');//Essa linha informa para o Express que seu engine (motor) de views passou a ser o módulo EJS. A propriedade que queremos ajustar do Express é o "view engine".
app.set('views', './app/views');//apontar diretório de views padrão, onde o Express vai pesquisar as views. Propriedade: views. Parametro: ./app/views

console.log("Servidor correndo com EJS");

consign().include('app/routes').into(app); //função include do consign faz o seguinte: executa um scam no diretório app/routes, recupera e inicialiaza os módulos dentro dele e atribui isso a nossa aplicação. O consign pode fazer auto-load não apenas de rotas, mas também de arquivos de configração, de controles, etc...
//chamar função consign e função include. Inclui o routes. A execução da função do módulo do consign seja passada por parametro para dentro da nossa instânica do servidor -- into(app)

module.exports = app;