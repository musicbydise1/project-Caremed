module.exports = (sequelize, Sequelize) => {
    // Определение модели
    const Category = sequelize.define("categories", {
        name: {
            type: Sequelize.STRING,
        }
    });
    return Category;
};
