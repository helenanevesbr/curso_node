module.exports = function(app){
    app.get('/', function (req, res) {
        res.render("home/index");//com a inclusão do EJS, o Express passou a ter o método render
    });
};