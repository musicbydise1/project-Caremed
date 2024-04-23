const { authJwt } = require("../middleware");
const controller = require("../controllers/category.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });



    app.post(
        "/api/category/create",
        controller.create
    );
    app.get(
        "/api/category/show/all",
        controller.findAll
    );

    app.get(
        "/api/category/show/",
        controller.findAllCategoriesWithSymptoms
    );

    app.put(
        "/api/category/edit/:id",
        controller.update
    );

    app.delete(
        "/api/category/delete/:id",
        controller.delete
    );

};
