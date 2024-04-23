module.exports = (sequelize, Sequelize) => {
    return sequelize.define("symptoms", {
        name: {
            type: Sequelize.STRING,
        },
        categoryId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'categories', // имя таблицы в БД
                key: 'id'
            }
        },
    });
};
