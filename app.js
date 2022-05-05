var app = require('./config/server');//estamos modulando(separar em m�dulos) dentro da nossa aplica��o o c�digo de infraestrutura do c�digo de neg�cio.

/*app.get('/', function (req, res) { //O s�mbolo de / se refere ao endere�o raiz, ou seja, o que vai aparecer quando voc� requisitar no navegador apenas "localhost:3000". Isso � a home da nossa p�gina, aka diret�rio principal.
    res.send("<html><body>Portal de Not�cias</body></html>")//com base no request da p�gina home, ele envia uma resposta
})
//O express permite simplificar a rota de requisi��o-resposta. Us�vamos o m�todo end quando trabalhavamos diretamente com o node, e aqui usamos o m�todo send

app.get('/', function (req, res) {
    res.render("home/index");//com a inclus�o do EJS, o Express passou a ter o m�todo render
});
*/

/*Esse c�digo foi substitu�do depois que o m�dulo consign foi instalado. Sem o cosign, as rotas precisariam ser carregadas no app.js uma � uma e precisariamos de um require para cada uma delas. Procurar "consign().include" no m�dulo server.js para ver a diferen�a.
 * 
    var rotaHome = require('./app/routes/home');
    rotaHome(app); //equivalente � chamar function (app){} dentro do m�dulo home.js
 
    var rotaNoticias = require('./app/routes/noticias')(app);//com o ejs, n�s podemos chamar a fun��o de qualquer m�dulo (no caso, do noticias.js) de maneira mais simples do que o exemplo acima

    var rotaFormInclusaoNoticia = require('./app/routes/formulario_inclusao_noticia')(app);
*/

app.listen(3000, function () { /*m�todo listen fica escutando requisi��es em uma determinada porta. Ele sobe o servidor que vai ficar escutando na porta.
 * A fun��o por par�metro � uma fun��o de callback. Ela � executada na subida do servidor. No exemplo, apenas executamos uma mensagem no console*/
    console.log("Servidor ON");
    //console.log(msg);
});