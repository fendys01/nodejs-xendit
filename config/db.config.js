require('dotenv').config({path: './.env'});
module.exports = {
    HOST: process.env.DB_HOST,
    USER:  process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    PORT: process.env.DB_PORT,
    dialect: process.env.DB_DRIVER, // driver
    dialectOptions: {
        ssl: {
            require:true,
            rejectUnauthorized: false
        }
    },
    operatorAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', 
        timestamps: true
    },
    logging: process.env.DB_LOG === "true"
}