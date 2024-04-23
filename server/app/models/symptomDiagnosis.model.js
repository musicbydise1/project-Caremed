module.exports = (sequelize, Sequelize) => {
    // Определение модели
    const SymptomDiagnosis = sequelize.define("symptomdiagnosis", {
        symptomId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'symptoms',
                key: 'id'
            }
        },
        diagnosisId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'diagnosis',
                key: 'id'
            }
        }
    });
    return SymptomDiagnosis;
};
