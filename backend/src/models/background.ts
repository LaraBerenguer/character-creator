import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../database/connection';

// Define attributes interface
interface BackgroundAttributes {
  id: number;
  title: string;
  description: string;
  type: 'trait' | 'flaw' | 'bond' | 'ideal';
  user_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// For creating a new background (id is optional)
interface BackgroundCreationAttributes extends Optional<BackgroundAttributes, 'id'> {}

// Define the model class with proper typing
class Background extends Model<BackgroundAttributes, BackgroundCreationAttributes> implements BackgroundAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public type!: 'trait' | 'flaw' | 'bond' | 'ideal';
  public user_id?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Background.init(
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
    sequelize,
    tableName: 'backgrounds',
    timestamps: true,
  }
);

export default Background;