import { DataTypes, Model } from "sequelize";
import db from '.'

class PhoneAttributes extends Model {
  declare id: number;
  declare price: number;
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
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneId: {
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

 export default PhoneAttributes;