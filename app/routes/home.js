module.exports = function(app){
    app.get('/', function (req, res) {
        res.render("home/index");//com a inclus�o do EJS, o Express passou a ter o m�todo render
    });
};