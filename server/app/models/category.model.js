module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    Category.associate = models => {
        Category.hasMany(models.symptoms, {
            foreignKey: 'categoryId',
            as: 'symptoms'
        });
    };

    return Category;
};
