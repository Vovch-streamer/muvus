import { DataTypes } from "sequelize";

export const getMovieModel = async (sequelize) => {
  const Movie = await sequelize.define("Movie", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Movie;
};
