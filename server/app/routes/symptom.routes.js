const { authJwt } = require("../middleware");
const controller = require("../controllers/symptom.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });



    app.post(
        "/api/symptom/create",
        controller.create
    );
    app.get(
        "/api/symptom/show/all",
        controller.findAll
    );

    app.get(
        "/api/symptom/show/:id",
        controller.findOne
    );

    app.put(
        "/api/symptom/edit/:id",
        controller.update
    );

    app.delete(
        "/api/symptom/delete/:id",
        controller.delete
    );
};
