const { authJwt } = require("../middleware");
const diagnoseController = require("../controllers/diagnos.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/diagnoses/create",
        // [authJwt.verifyToken], // Добавьте проверку токена, если требуется
        diagnoseController.createDiagnosis
    );

    app.post(
        "/api/diagnoses/symptom-diagnosis",
        // [authJwt.verifyToken], // Добавьте проверку токена, если требуется
        diagnoseController.createSymptomDiagnosis
    );

    app.post(
        "/api/diagnoses/search",
        // [authJwt.verifyToken], // Добавьте проверку токена, если требуется
        diagnoseController.searchDiagnosis
    );

    app.get(
        "/api/diagnoses",
        // [authJwt.verifyToken], // Добавьте проверку токена, если требуется
        diagnoseController.findAllDiagnoses
    );

    app.put(
        "/api/diagnoses/:id",
        // [authJwt.verifyToken], // Добавьте проверку токена, если требуется
        diagnoseController.updateDiagnosis
    );

    app.delete(
        "/api/diagnoses/:id",
        // [authJwt.verifyToken], // Добавьте проверку токена, если требуется
        diagnoseController.deleteDiagnosis
    );
};
