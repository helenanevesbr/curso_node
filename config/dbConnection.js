/*1� passo) baixar o banco de dados MySQL em si no site oficial e, pelo command prompt, um m�dulo que funciona como um drive de conex�o entre nossa aplica��o escrita em javascript rodando no node com o banco de dados SQL (Para assim acessar e gravar dados na SQL).
* 2� passo) criar um banco de dados chamado noticias, e uma tabela dentro dele onde vamos inserir linhas
* 3� passo) acessar "Servi�os" no Windows e colocar MySQL para iniciar servi�o
* 4� passo) acessar execut�vel do mysql pelo prompt de comando*/

//esse arquivo est� isolando (modulando) o m�todo de conex�o com o banco de dados. Antes ele estava parametrizado dentro de uma rota (noticias.js). Se no futuro precisar mudar o host (e vai precisar uma vez que o site esteja na nuvem e n�o seja mais localhost), voc� n�o vai precisar mudar arquivo por arquivo.

var mysql = require('mysql');//Isso est� incorporando (aka recuperando), � aplica��o, o m�dulo baixado no passo 1

var connMySQL = function () {
    console.log('Conexao com DB foi estabelecida');
    var connection = mysql.createConnection({ //createConnection � uma fun��o do m�dulo MySQL para fazer uma conex�o com o banco de dados. Os par�metros dessa conex�o s�o passados em uma estrutura JSON, como voc� pode ver abaixo.
        host: process.env.DB_HOST || 'localhost', //endere�o do servidor. No caso est� instalado na pr�pria m�quina que o est� rodando.
        user:  process.env.DB_USER || 'helena',
        password: process.env.DB_PASSWORD ||  'password',
        database: process.env.DB_DATABASE ||  'portal_noticias',
    });

    setInterval(() => {
        connection.connect(function(err) {
            if(err) {
                console.error(err)
                process.exit(1)
            }
        });

    
    }, 60 * 1000)


    return connection;
}

module.exports = function () { //Antes do m�dulo consign, exportavamos o mysql.createConnection como uma fun��o. Dentro do c�digo de cada arquivo de rota precisava existir um require do m�dulo dbConnection. Lembrando: o comando exportar diz o que o c�digo vai exportar para um comando require.
    console.log('O autoload carregou o modulo de conex�o com o banco de dados, mas a conexao com DB n�o foi estabelecida')//a conex�o ser� estabelecida apenas quando assim desejarmos. Com dbConnection.js exportando a var�avel connMySQL, ele deixa a fun��o contida nela dispon�vel para qualquer m�dulo requisitar, sem que ela seja automaticamente executada pelo cosign toda vez que o app.js � executado.
    return connMySQL;//Antes do m�dulo consign, tudo dentro de return da fun��o na vari�vel connMySQL (c�digo que come�a com var connMySQL = function ()) era o return da fun��o do exports. Depois do m�dulo consign, o return do exports para o server.js � apenas a vari�vel connMySQL. Isso porque server.js utiliza o m�dulo consign e ele executa fun��es automaticamente.
}
