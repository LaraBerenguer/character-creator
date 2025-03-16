import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';
import User from './user';
import Background from './background';

// Define attributes interface
interface CharacterAttributes {
  id: number;
  name: string | null;
  description: string | null;
  user_id: number;
  trait_id: number;
  flaw_id: number;
  bond_id: number;
  ideal_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// For creating a new character (id is optional)
interface CharacterCreationAttributes extends Optional<CharacterAttributes, 'id'> {}

// Define the model class with proper typing
class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
  public id!: number;
  public name!: string | null;
  public description!: string | null;
  public user_id!: number;
  public trait_id!: number;
  public flaw_id!: number;
  public bond_id!: number;
  public ideal_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Character.init(
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
    sequelize,
    tableName: 'characters',
    timestamps: true,
  }
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