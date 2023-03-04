import { Sequelize } from 'sequelize';
import {sequelizeConnectionString} from '../db.js'
import { getMovieModel } from './models/Movie.js'; 

export const getAllMovies = async () => {
    const sequelize = new Sequelize(sequelizeConnectionString);

    const Movie = await getMovieModel(sequelize);
    const movies = await Movie.findAll();

    sequelize.close();

    return movies;
}