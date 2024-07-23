const express = require("express");
const cors = require("cors");
const bcrypt = require('bcryptjs');

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
  initialUser()
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to caremed." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/patient.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/symptom.routes')(app);
require('./app/routes/analysCategory.routes')(app);
require('./app/routes/analysIndicator.routes')(app);
require('./app/routes/diagnose.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });
}

function initialUser() {
  // Создаем пользователя с ролью администратора
  const adminPassword = "admin"; // Пароль администратора

  bcrypt.hash(adminPassword, 6, (err, hash) => {
    if (err) {
      console.error('Failed to hash password:', err);
      return;
    }

    User.create({
      id: 1,
      username: "admin",
      email: "admin@admin.com",
      password: hash // Сохраняем хэшированный пароль
    }).then(user => {
      Role.findAll({
        where: {
          name: "admin"
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          console.log("Admin user created successfully");
        });
      });
    });
  });
}