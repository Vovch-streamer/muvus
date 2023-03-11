import { DataTypes } from "sequelize";

export const defineUserModel = async (sequelize) =>
  sequelize.define("User", {
    login: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    hashedPassword: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    salt: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
  });
