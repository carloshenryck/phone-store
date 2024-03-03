import { DataTypes, Model } from "sequelize";
import db from '.'

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
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
 }, {
  sequelize: db,
  tableName: 'User',
  timestamps: false,
  underscored: true,
 })

 export default User;