import { DataTypes } from 'sequelize';
import sequelize from '../database/connection';

const Background = sequelize.define(
    'Background',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('trait', 'flaw', 'bond', 'ideal'),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    },
    {
        tableName: 'backgrounds',
        timestamps: true,
    },
);

export default Background;