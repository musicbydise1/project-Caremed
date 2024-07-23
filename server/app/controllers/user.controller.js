
const db = require("../models");
const bcrypt = require("bcryptjs");
const User = db.user;  // Убедитесь, что название модели соответствует определению
const Role = db.role;

// Создание нового пациента
exports.create = (req, res) => {

  // Создание объекта пациента
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Получение всех пациентов из базы данных
exports.findAll = (req, res) => {
    User.findAll({
        include: Role // Включаем данные о ролях пользователей
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving patients."
            });
        });
};

exports.findAllRole = (req, res) => {
    Role.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving patients."
            });
        });
};

// Получение одного пациента по идентификатору
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Patient with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Patient with id=" + id
        });
      });
};

// Обновление данных пациента по идентификатору
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Patient was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Patient with id=" + id
        });
      });
};

// Удаление пациента по идентификатору
exports.delete = (req, res) => {
  const id = req.params.id;
    const db = require("../models");
    const bcrypt = require("bcryptjs");
    const User = db.user;  // Убедитесь, что название модели соответствует определению
    const Role = db.role;

// Создание нового пациента
    exports.create = (req, res) => {

        // Создание объекта пациента
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        })
            .then(user => {
                if (req.body.roles) {
                    Role.findAll({
                        where: {
                            name: {
                                [Op.or]: req.body.roles
                            }
                        }
                    }).then(roles => {
                        user.setRoles(roles).then(() => {
                            res.send({ message: "User registered successfully!" });
                        });
                    });
                } else {
                    // user role = 1
                    user.setRoles([1]).then(() => {
                        res.send({ message: "User registered successfully!" });
                    });
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    };

// Получение всех пациентов из базы данных
    exports.findAll = (req, res) => {
        User.findAll({
            include: Role // Включаем данные о ролях пользователей
        })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving patients."
                });
            });
    };

    exports.findAllRole = (req, res) => {
        Role.findAll()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving patients."
                });
            });
    };

// Получение одного пациента по идентификатору
    exports.findOne = (req, res) => {
        const id = req.params.id;

        User.findByPk(id)
            .then(data => {
                if (data) {
                    res.send(data);
                } else {
                    res.status(404).send({
                        message: `Cannot find Patient with id=${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error retrieving Patient with id=" + id
                });
            });
    };

// Обновление данных пациента по идентификатору
    exports.update = (req, res) => {
        const id = req.params.id;

        // Check if the password is part of the update
        if (req.body.password) {
            // Hash the new password
            bcrypt.hash(req.body.password, 8, (err, hash) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error hashing password."
                    });
                }

                // Update the password in the request body to the hashed version
                req.body.password = hash;

                // Now proceed to update the user with the hashed password
                updateUser(req, res, id);
            });
        } else {
            // Proceed to update the user without changing the password
            updateUser(req, res, id);
        }
    };

// Helper function to update user
    function updateUser(req, res, id) {
        User.update(req.body, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Patient was updated successfully."
                    });
                } else {
                    res.send({
                        message: `Cannot update Patient with id=${id}. Maybe Patient was not found or req.body is empty!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Patient with id=" + id
                });
            });
    }

// Удаление пациента по идентификатору
    exports.delete = (req, res) => {
        const id = req.params.id;

        User.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Patient was deleted successfully!"
                    });
                } else {
                    res.status(404).send({
                        message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Patient with id=" + id
                });
            });
    };


    User.destroy({
    where: { id: id }
  })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Patient was deleted successfully!"
          });
        } else {
          res.status(404).send({
            message: `Cannot delete Patient with id=${id}. Maybe Patient was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Patient with id=" + id
        });
      });
};
