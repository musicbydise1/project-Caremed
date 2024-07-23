const db = require("../models");
const Diagnosis = db.diagnos;
const Symptom = db.symptom;
const SymptomDiagnosis = db.symptomdiagnos;

// Создание диагноза
exports.createDiagnosis = (req, res) => {
    Diagnosis.create(req.body)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Diagnosis."
            });
        });
};

// Создание связи симптом-диагноз
exports.createSymptomDiagnosis = (req, res) => {
    SymptomDiagnosis.create(req.body)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the SymptomDiagnosis."
            });
        });
};

// Поиск диагноза по симптомам
exports.searchDiagnosis = (req, res) => {
    const { symptoms } = req.body;

    Diagnosis.findAll({
        include: [
            {
                model: Symptom,
                as: 'symptoms',
                through: {
                    attributes: ['probability']
                }
            }
        ]
    })
        .then(diagnoses => {
            // Вычисление апостериорных вероятностей
            let posteriors = {};
            let totalProbability = 0;

            diagnoses.forEach(diagnosis => {
                let posterior = diagnosis.priorProbability || 1; // Используем priorProbability или 1 если не указана
                diagnosis.symptoms.forEach(symptom => {
                    if (symptoms.includes(symptom.id)) {
                        posterior *= symptom.symptomDiagnosis.probability;
                    }
                });
                posteriors[diagnosis.id] = {
                    name: diagnosis.name,
                    description: diagnosis.description,
                    probability: posterior
                };
                totalProbability += posterior;
            });

            // Нормализация вероятностей
            Object.keys(posteriors).forEach(diagnosisId => {
                posteriors[diagnosisId].probability /= totalProbability;
            });

            // Найти диагноз с максимальной вероятностью
            let maxDiagnosis = Object.values(posteriors).reduce((max, diagnosis) => {
                return diagnosis.probability > max.probability ? diagnosis : max;
            }, { probability: 0 });

            res.send(maxDiagnosis);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while searching for Diagnosis."
            });
        });
};


// Получение списка всех диагнозов
exports.findAllDiagnoses = (req, res) => {
    Diagnosis.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving diagnoses."
            });
        });
};

// Обновление диагноза
exports.updateDiagnosis = (req, res) => {
    const id = req.params.id;

    Diagnosis.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Diagnosis was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Diagnosis with id=${id}. Maybe Diagnosis was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Diagnosis with id=" + id
            });
        });
};

// Удаление диагноза
exports.deleteDiagnosis = (req, res) => {
    const id = req.params.id;

    Diagnosis.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Diagnosis was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Diagnosis with id=${id}. Maybe Diagnosis was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Diagnosis with id=" + id
            });
        });
};
