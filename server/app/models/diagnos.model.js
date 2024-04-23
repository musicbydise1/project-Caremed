module.exports = (sequelize, Sequelize) => {
    // Определение модели
    const Diagnos = sequelize.define("diagnosis", {
        name: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING,
        }
    });
    return Diagnos;
};
