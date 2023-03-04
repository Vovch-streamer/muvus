import { Sequelize } from "sequelize";
import { sequelizeConnectionString } from "../db.js";
import { getMovieModel } from "../models/Movie.js";

import data from "./movies.json" assert { type: "json" };

const sequelize = new Sequelize(sequelizeConnectionString);

try {
  const Movie = await getMovieModel(sequelize);

  for (let movie of data) {
    await Movie.build(movie).save();
  }
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

sequelize.close();
