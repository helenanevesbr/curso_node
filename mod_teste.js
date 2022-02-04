//para incluir um módulo dentro da applicação, usamos a função require. Mas e para implementar/criar um módulo? O common JS é o formato que define a construção desses módulos. As regras de escrita para que um simples require faça que um módulo seja incluso na aplicação, aka seja incorporado ao Node.

/*var msg = "Este módulo contem apenas uma string";

module.exports = msg;//o que o nosso módulo exporta para a aplicação está consumindo ele. Sem o método exports, o console.log(msg) no arquivo app.js não retorna nada.*/

module.exports = function() {//um módulo pode retornar qualquer coisa - um objeto, uma string, um boolean. É muito frequente que ele retorne funções. Isso é uma função anônima.
    var msg = "Este modulo contem apenas uma string";
    return msg;
}