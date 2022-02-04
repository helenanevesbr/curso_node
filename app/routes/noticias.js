module.exports = function (app) { //app é um parâmetro. No app.js é uma variável de inclusão do módulo server, que no server.js é a implementação do Express. Para que a informção de app seja recebida por este módulo e dentro do escopo da função, precisamos passar ela por parametro.
    app.get('/noticias', function (req, res) {

        /*1° passo) baixar o banco de dados MySQL em si no site oficial e, pelo command prompt, um módulo que funciona como um drive de conexão entre nossa aplicação escrita em javascript rodando no node com o banco de dados SQL (Para acessar para gravar dados na SQL).
         * 2º passo) criar um banco de dados chamado noticias, e uma tabela dentro dele onde vamos inserir linhas
         * 3° passo) acessar "Serviços" no Windows e colocar MySQL para iniciar serviço
         * 4° passo) acessar executável do mysql pelo prompt de comando*/

        var mysql = require('mysql');//Isso está incorporando à aplicação o módulo baixado no passo 1

        var connection = mysql.createConnection({//createConnection é uma função do módulo MySQL. Os parâmetros dessa conexão são passados em uma estrutura JSON, como você pode ver abaixo.
            host: 'localhost', //endereço do servidor. No caso está instalado na própria máquina que o está rodando.
            user: 'helena',
            password: 'password',
            database: 'portal_noticias',
        });
        
        connection.query('select * from noticias', function (error, result) { /*query é uma função (comando) que espera 2 coisas: o sql e uma função de callback. SQL é a consulta ao banco de dados, callback é o que vai ser feito após a consulta ser realizada.
         * Especificamente sendo função desse módulo, o callback espera 2 coisas: o erro e o resultado. Se der algum erro, conseguimos recuperar ele atravéz dessa variável*/
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