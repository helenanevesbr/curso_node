/*1� passo) baixar o banco de dados MySQL em si no site oficial e, pelo command prompt, um m�dulo que funciona como um drive de conex�o entre nossa aplica��o escrita em javascript rodando no node com o banco de dados SQL (Para assim acessar e gravar dados na SQL).
* 2� passo) criar um banco de dados chamado noticias, e uma tabela dentro dele onde vamos inserir linhas
* 3� passo) acessar "Servi�os" no Windows e colocar MySQL para iniciar servi�o
* 4� passo) acessar execut�vel do mysql pelo prompt de comando*/

//esse arquivo est� isolando (modulando) o m�todo de conex�o com o banco de dados. Antes ele estava parametrizado dentro de uma rota (noticias.js). Se no futuro precisar mudar o host (e vai precisar uma vez que o site esteja na nuvem e n�o seja mais localhost), voc� n�o vai precisar mudar arquivo por arquivo.

var mysql = require('mysql');//Isso est� incorporando (aka recuperando), � aplica��o, o m�dulo baixado no passo 1

class DBConnection {
    constructor() {        
        console.log('Conexao com DB foi estabelecida');
        this.mysqlConnectionPool = mysql.createPool({ //createConnection � uma fun��o do m�dulo MySQL para fazer uma conex�o com o banco de dados. Os par�metros dessa conex�o s�o passados em uma estrutura JSON, como voc� pode ver abaixo.
            host: process.env.DB_HOST || 'localhost', //endere�o do servidor. No caso est� instalado na pr�pria m�quina que o est� rodando.
            user:  process.env.DB_USER || 'helena',
            password: process.env.DB_PASSWORD ||  'password',
            database: process.env.DB_DATABASE ||  'portal_noticias',
        });
    }

    query(...args) {
        this.mysqlConnectionPool.query(...args)
    }
}

module.exports = new DBConnection();