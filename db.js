const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
    process.env.DB_NAME, // the name of database
    process.env.DB_USER, // the username
    process.env.DB_PASSWORD, // the password
    {
        host: process.env.DB_HOST, // localhost 
        dialect: process.env.DB_DIALECT, // postgres
        port: process.env.DB_PORT // 5432
    });
