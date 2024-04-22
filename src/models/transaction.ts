import { DataTypes } from "sequelize";
import sequelize from "../util/database";
import User from "./user";

const Transaction = sequelize.define("Transaction", {
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
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
  shares: {
    type: DataTypes.INTEGER,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
  },
  type: {
    type: DataTypes.ENUM("Purchase", "Sale"),
    defaultValue: "Purchase",
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
    onUpdate: "CURRENT_TIMESTAMP",
  },
});

Transaction.belongsTo(User, { foreignKey: "user_id" });
export default Transaction;
