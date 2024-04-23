const { authJwt } = require("../middleware");
const controller = require("../controllers/analysIndicator.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });



    app.post(
        "/api/analys-indicator/create",
        controller.create
    );
    app.get(
        "/api/analys-indicator/show/all",
        controller.findAll
    );

    app.get(
        "/api/analys-indicator/show/:id",
        controller.findOne
    );

    app.put(
        "/api/analys-indicator/edit/:id",
        controller.update
    );

    app.delete(
        "/api/analys-indicator/delete/:id",
        controller.delete
    );
};
