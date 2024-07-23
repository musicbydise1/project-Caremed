module.exports = (sequelize, Sequelize) => {
    const SymptomDiagnosis = sequelize.define("symptomDiagnosis", {
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
                model: 'diagnoses',
                key: 'id'
            }
        },
        probability: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });

    return SymptomDiagnosis;
};
