const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.post(
      "/api/users/create",
      controller.create
  );
  app.get(
      "/api/users/show/all",
      controller.findAll
  );
  app.get(
      "/api/users/roles/show/all",
      controller.findAllRole
  );

  app.get(
      "/api/users/show/:id",
      controller.findOne
  );

  app.put(
      "/api/users/edit/:id",
      controller.update
  );

  app.delete(
      "/api/users/delete/:id",
      controller.delete
  );
};
