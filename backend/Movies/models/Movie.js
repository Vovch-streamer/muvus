import { DataTypes } from "sequelize";

export const defineMovieModel = async (sequelize) =>
  await sequelize.define("Movie", {
    name: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  });
