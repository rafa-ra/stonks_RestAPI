import { DataTypes } from "sequelize";
import sequelize from "../util/database";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cash: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 10000.0,
    },
  },
  { timestamps: false }
);
