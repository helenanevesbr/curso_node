module.exports = function (app) { //app � um par�metro. No app.js � uma vari�vel de inclus�o do m�dulo server, que no server.js � a implementa��o do Express. Para que a inform��o de app seja recebida por este m�dulo e dentro do escopo da fun��o, precisamos passar ela por parametro.
    app.get('/noticias', function (req, res) {

        /*1� passo) baixar o banco de dados MySQL em si no site oficial e, pelo command prompt, um m�dulo que funciona como um drive de conex�o entre nossa aplica��o escrita em javascript rodando no node com o banco de dados SQL (Para acessar para gravar dados na SQL).
         * 2� passo) criar um banco de dados chamado noticias, e uma tabela dentro dele onde vamos inserir linhas
         * 3� passo) acessar "Servi�os" no Windows e colocar MySQL para iniciar servi�o
         * 4� passo) acessar execut�vel do mysql pelo prompt de comando*/

        var mysql = require('mysql');//Isso est� incorporando � aplica��o o m�dulo baixado no passo 1

        var connection = mysql.createConnection({//createConnection � uma fun��o do m�dulo MySQL. Os par�metros dessa conex�o s�o passados em uma estrutura JSON, como voc� pode ver abaixo.
            host: 'localhost', //endere�o do servidor. No caso est� instalado na pr�pria m�quina que o est� rodando.
            user: 'helena',
            password: 'password',
            database: 'portal_noticias',
        });
        
        connection.query('select * from noticias', function (error, result) { /*query � uma fun��o (comando) que espera 2 coisas: o sql e uma fun��o de callback. SQL � a consulta ao banco de dados, callback � o que vai ser feito ap�s a consulta ser realizada.
         * Especificamente sendo fun��o desse m�dulo, o callback espera 2 coisas: o erro e o resultado. Se der algum erro, conseguimos recuperar ele atrav�z dessa vari�vel*/
            if (error) {
                res.send(error);
            }
            else {
                res.send(result);
            }
        });

        //res.render("noticias/noticias");
    });
};