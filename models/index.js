const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');  

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        dialectOptions: {
            ssl: {
                require:dbConfig.dialectOptions.ssl.require,
                rejectUnauthorized: dbConfig.dialectOptions.ssl.rejectUnauthorized
            }
        },
        operatorAliases: dbConfig.operatorAliases,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        },
        define: {
            charset: dbConfig.define.charset,
            collate: dbConfig.define.collate, 
            timestamps: dbConfig.define.timestamps
        },
        logging: dbConfig.logging
    }
)

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.payment_log = require("./payment_log.model")(sequelize, Sequelize)

module.exports = db