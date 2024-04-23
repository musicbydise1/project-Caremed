const { authJwt } = require("../middleware");
const controller = require("../controllers/analysCategory.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });



    app.post(
        "/api/analys-category/create",
        controller.create
    );
    app.get(
        "/api/analys-category/show/all",
        controller.findAll
    );
    app.get(
        "/api/analys-category/show/",
        controller.findAllCategoriesWithSymptoms
    );

    app.put(
        "/api/analys-category/edit/:id",
        controller.update
    );

    app.delete(
        "/api/analys-category/delete/:id",
        controller.delete
    );
};
