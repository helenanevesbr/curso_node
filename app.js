var app = require('./config/server');//estamos modulando(separar em módulos) dentro da nossa aplicação o código de infraestrutura do código de negócio.

/*app.get('/', function (req, res) { //O símbolo de / se refere ao endereço raiz, ou seja, o que vai aparecer quando você requisitar no navegador apenas "localhost:3000". Isso é a home da nossa página, aka diretório principal.
    res.send("<html><body>Portal de Notícias</body></html>")//com base no request da página home, ele envia uma resposta
})
//O express permite simplificar a rota de requisição-resposta. Usávamos o método end quando trabalhavamos diretamente com o node, e aqui usamos o método send

app.get('/', function (req, res) {
    res.render("home/index");//com a inclusão do EJS, o Express passou a ter o método render
});*/

var rotaHome = require('./app/routes/home');
rotaHome(app); //equivalente à chamar function (app){} dentro do módulo home.js

var rotaNoticias = require('./app/routes/noticias')(app);//com o ejs, nós podemos chamar a função de qualquer módulo (no caso, do noticias.js) de maneira mais simples do que o exemplo acima

var rotaFormInclusaoNoticia = require('./app/routes/formulario_inclusao_noticia')(app);

app.listen(3000, function () { /*método listen fica escutando requisições em uma determinada porta. Ele sobe o servidor que vai ficar escutando na porta.
 * A função por parâmetro é uma função de callback. Ela é executada na subida do servidor. No exemplo, apenas executamos uma mensagem no console*/
    console.log("Servidor ON");
    //console.log(msg);
});