import { Sequelize } from "sequelize";

const sequelize = new Sequelize("stocktrading", "root", "Castlevania31*DB", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
