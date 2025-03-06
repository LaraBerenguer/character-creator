import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database/connection';
import User from './user';
import Background from './background';

const Character = sequelize.define(
    'Character',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        trait_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'backgrounds',
                key: 'id'
            }
        },
        flaw_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'backgrounds',
                key: 'id'
            }
        },
        bond_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'backgrounds',
                key: 'id'
            }
        },
        ideal_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'backgrounds',
                key: 'id'
            }
        }
    },
    {
        tableName: 'characters',
        timestamps: true,
    },
);

Character.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Character.belongsTo(Background, { foreignKey: 'trait_id', as: 'trait' });
Character.belongsTo(Background, { foreignKey: 'flaw_id', as: 'flaw' });
Character.belongsTo(Background, { foreignKey: 'bond_id', as: 'bond' });
Character.belongsTo(Background, { foreignKey: 'ideal_id', as: 'ideal' });

export default Character;

//PARA FETCH
/*
const character = await Character.findByPk(id, {
  include: [
    { model: Background, as: 'trait' },
    { model: Background, as: 'flaw' },
    { model: Background, as: 'bond' },
    { model: Background, as: 'ideal' },
    { model: User, as: 'user' }
  ]
}); */