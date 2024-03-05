import { DataTypes, Model } from "sequelize";
import db from '.'
import Phone from "./Phone";

class PhoneAttributes extends Model {
  declare id: number;
  declare prince: number;
  declare color: string;
  declare phoneId: number;
}

PhoneAttributes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "phone",
        key: "id",
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
 }, {
  sequelize: db,
  tableName: 'phone_attributes',
  timestamps: false,
  underscored: true,
 })

 PhoneAttributes.belongsTo(Phone, {
  foreignKey: 'phoneId',
  as: 'phone'
 })

 export default Phone;