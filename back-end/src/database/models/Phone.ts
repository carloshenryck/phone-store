import { DataTypes, Model } from "sequelize";
import db from '.'
import User from "./User";

class Phone extends Model {
  declare id: number;
  declare brand: string;
  declare model: string;
  declare name: string;
  declare userId: number;
}

Phone.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
 }, {
  sequelize: db,
  tableName: 'phone',
  timestamps: false,
  underscored: true,
 })

 Phone.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
 })

 export default Phone;