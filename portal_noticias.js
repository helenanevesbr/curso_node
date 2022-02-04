// importo o módulo http 
var http = require('http');

var server = http.createServer(function (req, res) {
    //uma request é o pedindo de uma página web para um servidor HTTP. Esses pedidos são feitos através de uma URL. Abaixo estão diversas HTML para requests (URLs) diferentes.
    //o servidor recupera (recebe) a request e envia a o html
    var categoria = req.url; //url aqui é um atributo do objeto request. A função recupera a requisição e trata a url da requisição.
    console.log(categoria);
    if (categoria == '/tecnologia') {
        res.end("<html><body>Notícias de tecnologia</body></html>")
    }
    else if (categoria == '/moda') {
        res.end("<html><body>Notícias de moda</body></html>")
    }
    else {
        res.end("<html><body>Portal de notícias</body></html>")
    }

});

// inicio o servidor na porta 3000
server.listen(3000);//enquanto o Visual Code (que funciona no terminal) estiver agarrado a esta porta, ou seja, enquanto essa linha de código existir, ele não termina o processo. Você precisa dar stop.