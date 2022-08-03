const homeController = require("../controllers/home")

module.exports = (application) => {
    application.get('/', homeController.index);
};