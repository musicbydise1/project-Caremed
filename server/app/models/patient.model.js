module.exports = (sequelize, Sequelize) => {
    return sequelize.define("patients", {
        name: {
            type: Sequelize.STRING,
            allowNull: true  // Добавьте, если поле должно быть обязательным
        },
        year: {
            type: Sequelize.INTEGER,
            allowNull: true  // Предполагаем, что год рождения обязателен
        },
        country: {
            type: Sequelize.STRING,
            allowNull: true
        },
        city: {
            type: Sequelize.STRING,
            allowNull: true
        },
        gender: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isIn: [['male', 'female', 'other']]  // Ограничьте значениями, если это необходимо
            }
        },
        blood: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']]  // Пример для групп крови
            }
        },
        phone: {
            type: Sequelize.STRING,  // Изменено на STRING для поддержки международного формата
            allowNull: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,  // Гарантирует уникальность email в базе данных
            validate: {
                isEmail: true  // Валидация формата email
            }
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        },
        diagnosis: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });
};
