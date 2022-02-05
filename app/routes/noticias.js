var dbConnection = require('../../config/dbConnection'); //O require no arquivo rota + o comando exports no arquivo dbConnection se comunicam para que a fun��o dentro de module.exports do arquivo dbConnection possa ser recuperada dentro da vari�vel dbConnection no arquivo rota.

module.exports = function (app) { //app � um par�metro. No app.js � uma vari�vel de inclus�o do m�dulo server, que no server.js � a implementa��o do Express. Para que a inform��o de app seja recebida por este m�dulo e dentro do escopo da fun��o, precisamos passar ela por parametro.

    var connection = dbConnection();/*acima � a fun��o em si. Com dbConnection() estamos executando a fun��o
     perceba que a var�avel connection que usamos para conectar com o banco de dados � a mesma que utiliamos para executar a query logo abaixo*/

    app.get('/noticias', function (req, res) {
    
        connection.query('select * from noticias', function (error, result) { /*query � uma fun��o (comando) que espera 2 coisas: o sql e uma fun��o de callback. SQL � a consulta ao banco de dados, callback � o que vai ser feito ap�s a consulta ser realizada.
         * Especificamente sendo fun��o desse m�dulo, o callback espera 2 coisas: o erro e o resultado. Se der algum erro, conseguimos recuperar ele atrav�z dessa vari�vel*/
            if (error) {
                res.send(error);
            }
            else {
                //res.send(result) iria cuspir o resultados recuperados do banco de dados na forma de json. Mas o interessante � criar uma view din�mica, ou seja: dentro da view, escrever c�digo javascript junto com a codifica��o est�tica html.
                res.render("noticias/noticias", { noticias: result }) /*"noticias/noticias" informa qual a view ir� renderizar o conet�do do banco de dados. O {noticias : result} � o json. Os results v�o ser recebidos na nossa view como se fosse uma vari�vel chamada "noticias".
                 * Essa vari�vel vai se comportar como uma array. Exemplo: 2 linhas da tabela do banco de dados s�o o �ndice 1 e 2 da array -- [{titulo: "titulo da noticia", noticia:"conteudo da noticia"}, {titulo: "outra noticia", noticia:"conteudo da outra noticia"}]*/
            }
        });
    });
};