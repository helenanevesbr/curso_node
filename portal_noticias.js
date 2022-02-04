// importo o m�dulo http 
var http = require('http');

var server = http.createServer(function (req, res) {
    //uma request � o pedindo de uma p�gina web para um servidor HTTP. Esses pedidos s�o feitos atrav�s de uma URL. Abaixo est�o diversas HTML para requests (URLs) diferentes.
    //o servidor recupera (recebe) a request e envia a o html
    var categoria = req.url; //url aqui � um atributo do objeto request. A fun��o recupera a requisi��o e trata a url da requisi��o.
    console.log(categoria);
    if (categoria == '/tecnologia') {
        res.end("<html><body>Not�cias de tecnologia</body></html>")
    }
    else if (categoria == '/moda') {
        res.end("<html><body>Not�cias de moda</body></html>")
    }
    else {
        res.end("<html><body>Portal de not�cias</body></html>")
    }

});

// inicio o servidor na porta 3000
server.listen(3000);//enquanto o Visual Code (que funciona no terminal) estiver agarrado a esta porta, ou seja, enquanto essa linha de c�digo existir, ele n�o termina o processo. Voc� precisa dar stop.