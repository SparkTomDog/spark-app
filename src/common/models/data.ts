import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const dataModel = sequelize.define("data", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    label: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    type: {
        type: DataTypes.STRING,
        defaultValue: "folder"
    },
    parentId: {
        type: DataTypes.STRING,
        defaultValue: "null"
    },
    createAt: {
        type: DataTypes.STRING,
        defaultValue: "null"
    },
    updateAt: {
        type: DataTypes.STRING,
        defaultValue: "null"
    },
    deleteAt: {
        type: DataTypes.STRING,
        defaultValue: "null"
    }
}, {
    timestamps: false,
    tableName: "data"
})