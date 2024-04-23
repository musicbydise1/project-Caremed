// controllers/patient.controller.js

const db = require("../models");
const Patient = db.patient;  // Убедитесь, что название модели соответствует определению

// Создание нового пациента
exports.create = (req, res) => {

    // Создание объекта пациента
    const patient = {
        name: req.body.name,
        year: req.body.year,
        country: req.body.country,
        city: req.body.city,
        gender: req.body.gender,
        blood: req.body.blood,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        diagnosis: req.body.diagnosis
    };

    // Сохранение пациента в базе данных
    Patient.create(patient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Patient."
            });
        });
};

// Получение всех пациентов из базы данных
exports.findAll = (req, res) => {
    Patient.findAll()
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

    Patient.findByPk(id)
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

    Patient.update(req.body, {
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

    Patient.destroy({
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
