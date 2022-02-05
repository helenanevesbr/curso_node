var dbConnection = require('../../config/dbConnection'); //O require no arquivo rota + o comando exports no arquivo dbConnection se comunicam para que a função dentro de module.exports do arquivo dbConnection possa ser recuperada dentro da variável dbConnection no arquivo rota.

module.exports = function (app) { //app é um parâmetro. No app.js é uma variável de inclusão do módulo server, que no server.js é a implementação do Express. Para que a informção de app seja recebida por este módulo e dentro do escopo da função, precisamos passar ela por parametro.

    var connection = dbConnection();/*acima é a função em si. Com dbConnection() estamos executando a função
     perceba que a varíavel connection que usamos para conectar com o banco de dados é a mesma que utiliamos para executar a query logo abaixo*/

    app.get('/noticias', function (req, res) {
    
        connection.query('select * from noticias', function (error, result) { /*query é uma função (comando) que espera 2 coisas: o sql e uma função de callback. SQL é a consulta ao banco de dados, callback é o que vai ser feito após a consulta ser realizada.
         * Especificamente sendo função desse módulo, o callback espera 2 coisas: o erro e o resultado. Se der algum erro, conseguimos recuperar ele atravéz dessa variável*/
            if (error) {
                res.send(error);
            }
            else {
                //res.send(result) iria cuspir o resultados recuperados do banco de dados na forma de json. Mas o interessante é criar uma view dinâmica, ou seja: dentro da view, escrever código javascript junto com a codificação estática html.
                res.render("noticias/noticias", { noticias: result }) /*"noticias/noticias" informa qual a view irá renderizar o conetúdo do banco de dados. O {noticias : result} é o json. Os results vão ser recebidos na nossa view como se fosse uma variável chamada "noticias".
                 * Essa variável vai se comportar como uma array. Exemplo: 2 linhas da tabela do banco de dados são o índice 1 e 2 da array -- [{titulo: "titulo da noticia", noticia:"conteudo da noticia"}, {titulo: "outra noticia", noticia:"conteudo da outra noticia"}]*/
            }
        });
    });
};