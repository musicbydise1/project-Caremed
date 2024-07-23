module.exports = (sequelize, Sequelize) => {
    const Symptom = sequelize.define("symptoms", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        categoryId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'categories',
                key: 'id'
            }
        }
    });

    Symptom.associate = (models) => {
        Symptom.belongsTo(models.category, {
            foreignKey: 'categoryId',
            as: 'category'
        });
        Symptom.belongsToMany(models.diagnosis, {
            through: models.symptomDiagnosis,
            foreignKey: 'symptomId',
            otherKey: 'diagnosisId',
            as: 'diagnoses'
        });
    };

    return Symptom;
};
