module.exports = (sequelize, Sequelize) => {
    const Diagnosis = sequelize.define("diagnosis", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        priorProbability: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
    });

    Diagnosis.associate = (models) => {
        Diagnosis.belongsToMany(models.symptom, {
            through: models.symptomDiagnosis,
            foreignKey: 'diagnosisId',
            otherKey: 'symptomId',
            as: 'symptoms'
        });
    };

    return Diagnosis;
};
