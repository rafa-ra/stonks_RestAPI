import { DataTypes } from "sequelize";
import sequelize from "../util/database";
import User from "./user";

const UserStocks = sequelize.define("UserStocks", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  stock_symbol: {
    type: DataTypes.STRING(255),
  },
  shares: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

UserStocks.belongsTo(User, { foreignKey: "user_id" });
export default UserStocks;
