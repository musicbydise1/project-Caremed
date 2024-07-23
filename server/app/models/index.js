const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.patient = require("../models/patient.model.js")(sequelize, Sequelize);
db.category = require("../models/category.model.js")(sequelize, Sequelize);
db.symptom = require("../models/symptom.model.js")(sequelize, Sequelize);
db.analyscategory = require("../models/analysCategory.model.js")(sequelize, Sequelize);
db.analysindicator = require("../models/analysIndicator.model.js")(sequelize, Sequelize);
db.diagnos = require("../models/diagnos.model.js")(sequelize, Sequelize);
db.symptomdiagnos = require("../models/symptomDiagnosis.model.js")(sequelize, Sequelize);

// Associations
db.category.hasMany(db.symptom, { foreignKey: 'categoryId', as: 'symptoms' });
db.symptom.belongsTo(db.category, { foreignKey: 'categoryId', as: 'category' });

db.analyscategory.hasMany(db.analysindicator, { foreignKey: 'categoryId', as: 'analysindicators' });
db.analysindicator.belongsTo(db.analyscategory, { foreignKey: 'categoryId', as: 'analyscategories' });

db.symptom.belongsToMany(db.diagnos, {
    through: db.symptomdiagnos,
    foreignKey: 'symptomId',
    otherKey: 'diagnosisId',
    as: 'diagnoses'
});

db.diagnos.belongsToMany(db.symptom, {
    through: db.symptomdiagnos,
    foreignKey: 'diagnosisId',
    otherKey: 'symptomId',
    as: 'symptoms'
});

db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: 'roleId',
    otherKey: 'userId'
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: 'userId',
    otherKey: 'roleId'
});

db.ROLES = ["admin", "user"];

module.exports = db;
