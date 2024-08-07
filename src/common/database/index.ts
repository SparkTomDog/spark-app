import { Sequelize } from "sequelize"

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './spark.db',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});