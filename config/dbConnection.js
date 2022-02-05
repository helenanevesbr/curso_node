/*1° passo) baixar o banco de dados MySQL em si no site oficial e, pelo command prompt, um módulo que funciona como um drive de conexão entre nossa aplicação escrita em javascript rodando no node com o banco de dados SQL (Para assim acessar e gravar dados na SQL).
* 2º passo) criar um banco de dados chamado noticias, e uma tabela dentro dele onde vamos inserir linhas
* 3° passo) acessar "Serviços" no Windows e colocar MySQL para iniciar serviço
* 4° passo) acessar executável do mysql pelo prompt de comando*/

//esse arquivo está isolando (modulando) o método de conexão com o banco de dados. Antes ele estava parametrizado dentro de uma rota (noticias.js). Se no futuro precisar mudar o host (e vai precisar uma vez que o site esteja na nuvem e não seja mais localhost), você não vai precisar mudar arquivo por arquivo.

var mysql = require('mysql');//Isso está incorporando (aka recuperando), à aplicação, o módulo baixado no passo 1

module.exports = function () { //para exportar o mysql.createConnection como uma função. Dentro do código de cada arquivo de rota deve existir um require do módulo dbConnection. O comando exportar diz o que o código vai exportar para um comando require. 
    return mysql.createConnection({//createConnection é uma função do módulo MySQL. Os parâmetros dessa conexão são passados em uma estrutura JSON, como você pode ver abaixo.
        host: 'localhost', //endereço do servidor. No caso está instalado na própria máquina que o está rodando.
        user: 'helena',
        password: 'password',
        database: 'portal_noticias',
    });
}
