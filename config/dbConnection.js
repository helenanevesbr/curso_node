/*1° passo) baixar o banco de dados MySQL em si no site oficial e, pelo command prompt, um módulo que funciona como um drive de conexão entre nossa aplicação escrita em javascript rodando no node com o banco de dados SQL (Para assim acessar e gravar dados na SQL).
* 2º passo) criar um banco de dados chamado noticias, e uma tabela dentro dele onde vamos inserir linhas
* 3° passo) acessar "Serviços" no Windows e colocar MySQL para iniciar serviço
* 4° passo) acessar executável do mysql pelo prompt de comando*/

//esse arquivo está isolando (modulando) o método de conexão com o banco de dados. Antes ele estava parametrizado dentro de uma rota (noticias.js). Se no futuro precisar mudar o host (e vai precisar uma vez que o site esteja na nuvem e não seja mais localhost), você não vai precisar mudar arquivo por arquivo.

var mysql = require('mysql');//Isso está incorporando (aka recuperando), à aplicação, o módulo baixado no passo 1

var connMySQL = function () {
    /*iniciar a aplicação (app.js) -> app requisita servidor(server.js). Se você iniciar a aplicação 50 vezes, 50 requisições serão feitos ao seu servidor (dentro do app.js tem require(server.js)), 50 conexões serão criadas com o banco MySQL.
Isso é um problema. Devemos utilizar o método wrapper = "embrulhar" método de conexão e retornar variável que contenha essa função. Dessa forma, o export será de uma variável, e não de uma função. Logo, ela não será automaticamente executada pelo cosign.
O consign exporta e executa. Se o módulo dbConnection exporta uma função, ela vai ser executada. Se exporta uma variável, podemos executar a função contida nela quando desejarmos.
Por exemplo, a única rota que utiliza o banco de dados, por enquanto é noticias.js. */
    console.log('Conexao com DB foi estabelecida');
    return mysql.createConnection({ //createConnection é uma função do módulo MySQL para fazer uma conexão com o banco de dados. Os parâmetros dessa conexão são passados em uma estrutura JSON, como você pode ver abaixo.
        host: 'localhost', //endereço do servidor. No caso está instalado na própria máquina que o está rodando.
        user: 'helena',
        password: 'password',
        database: 'portal_noticias',
    });
}

module.exports = function () { //Antes do módulo consign, exportavamos o mysql.createConnection como uma função. Dentro do código de cada arquivo de rota precisava existir um require do módulo dbConnection. Lembrando: o comando exportar diz o que o código vai exportar para um comando require.
    console.log('O autoload carregou o modulo de conexão com o banco de dados, mas a conexao com DB não foi estabelecida')//a conexão será estabelecida apenas quando assim desejarmos. Com dbConnection.js exportando a varíavel connMySQL, ele deixa a função contida nela disponível para qualquer módulo requisitar, sem que ela seja automaticamente executada pelo cosign toda vez que o app.js é executado.
    return connMySQL;//Antes do módulo consign, tudo dentro de return da função na variável connMySQL (código que começa com var connMySQL = function ()) era o return da função do exports. Depois do módulo consign, o return do exports para o server.js é apenas a variável connMySQL. Isso porque server.js utiliza o módulo consign e ele executa funções automaticamente.
}
