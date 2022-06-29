var app = require('./config/server');//estamos modulando(separar em m�dulos) dentro da nossa aplica��o o c�digo de infraestrutura do c�digo de neg�cio.

var port = process.env.PORT || 4000

app.listen(port, function () { /*m�todo listen fica escutando requisi��es em uma determinada porta. Ele sobe o servidor que vai ficar escutando na porta.
 * A fun��o por par�metro � uma fun��o de callback. Ela � executada na subida do servidor. No exemplo, apenas executamos uma mensagem no console*/
    console.log("Servidor ON. Escutando na porta " + port);
});