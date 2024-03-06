import { DataTypes, Model } from "sequelize";
import db from '.'
import Phone from "./Phone";

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
  declare name: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 }, {
  sequelize: db,
  tableName: 'user',
  timestamps: false,
  underscored: true,
 })

 User.hasMany(Phone, {
  foreignKey: 'userId',
  as: 'phones',
 })

 Phone.belongsTo(User, {
  foreignKey: 'userId',
 })

 export default User;