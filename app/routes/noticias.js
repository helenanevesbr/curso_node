/*var dbConnection = require('../../config/dbConnection'); //Desnecessário desde a instalação do módulo consign (ver arquivo server.js)*/

module.exports = function (app) { //app é um parâmetro, mas não é ele o responsável pela coneção com o servidor (arquivo server.js exporta a variável app). O método consign incluindo todas as rotas e o dbConnection.js faz o equivalente a adicionar require('../../config/server') em cada uma das rotas. Dessa forma, essa conexão não precisa ser estabelecida explicitamente. OBS: Não existia requisição do server nessa rota antes do método consign porque ele não precisava se conectar ao servidor para conseguir o dbConnection. Ele requisitava ele diretamente.

    /*var connection = dbConnection();//var dbConnection = require (linhas acima) era a função em si. Com dbConnection() estávamos executando a função. Perceba que a varíavel connection que usamos para conectar com o banco de dados é a mesma que utiliamos para executar a query (connection.query) logo abaixo*/

    app.get('/noticias', function (req, res) {//função vai ser executada apenas quando over requisição dessa página 

        var connection = app.config.dbConnection();//app - variável exportada pelo server.js. Graças ao consign, pode estabelecer conexão com Data Base assim, como se estivesse navegando até o diretório do arquivo dbConnection (perceba que em include.. then... into, estamos colocando config/dbConnection dentro de app)
        //colocamos dentro da rota (no app.get) para que a conexão com o banco de dados seja acessada apenas somente quando essa rota for acessada, ou seja, apenas quando a página que consome o banco de dados for requisitada.
        connection.query('select * from noticias', function (error, result) { /*query é uma função (comando) que espera 2 coisas: o sql e uma função de callback. SQL é a consulta ao banco de dados, callback é o que vai ser feito após a consulta ser realizada.
         * Especificamente sendo função desse módulo, o callback espera 2 coisas: o erro e o resultado. Se der algum erro, conseguimos recuperar ele atravéz dessa variável*/
            if (error) {
                res.send(error);
            } else {
                //res.send(result) iria cuspir o resultados recuperados do banco de dados na forma de json. Mas o interessante é criar uma view dinâmica, ou seja: dentro da view, escrever código javascript junto com a codificação estática html.
                res.render("noticias/noticias", { noticias: result }) /*"noticias/noticias" informa qual a view irá renderizar o conetúdo do banco de dados. O {noticias : result} é o json. Os results vão ser recebidos na nossa view como se fosse uma variável chamada "noticias".
                 * Essa variável vai se comportar como uma array. Exemplo: 2 linhas da tabela do banco de dados são o índice 1 e 2 da array -- [{titulo: "titulo da noticia", noticia:"conteudo da noticia"}, {titulo: "outra noticia", noticia:"conteudo da outra noticia"}]*/
            }
        });
    });
}