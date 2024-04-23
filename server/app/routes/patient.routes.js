const { authJwt } = require("../middleware");
const controller = require("../controllers/patient.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });



    app.post(
        "/api/patients/create",
        controller.create
    );
    app.get(
        "/api/patients/show/all",
        controller.findAll
    );

    app.get(
        "/api/patients/show/:id",
        controller.findOne
    );

    app.put(
        "/api/patients/edit/:id",
        controller.update
    );

    app.delete(
        "/api/patients/delete/:id",
        controller.delete
    );
};
