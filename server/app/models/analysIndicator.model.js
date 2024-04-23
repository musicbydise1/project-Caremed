module.exports = (sequelize, Sequelize) => {
    return sequelize.define("analysindicators", {
        name: {
            type: Sequelize.STRING,
        },
        categoryId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'analyscategories', // имя таблицы в БД
                key: 'id'
            }
        },
    });
};
