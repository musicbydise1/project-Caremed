module.exports = (sequelize, Sequelize) => {
    // Определение модели
    const AnalysCategory = sequelize.define("analyscategories", {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        }
    });
    return AnalysCategory;
};
