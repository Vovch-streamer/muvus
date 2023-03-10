import pg from 'pg';
import { Sequelize } from 'sequelize';
import { getMovieModel } from './models/Movie.js';

const database = 'muvus';
const user = 'muvus-app';
const password = 'qwerty';
const host = 'localhost';
const port = 5432;

const connectionStringBase = `postgres://${user}:${password}@${host}:${port}`;

const pgConfig = {
    user,
    database: 'postgres',
    password,
    port,
}

export const sequelizeConnectionString = `${connectionStringBase}/${database}`;

const pool = new pg.Pool(pgConfig);

await pool.connect(function (err, client, done) {
    client.query(`CREATE DATABASE ${database}`, (error) => {
        if (error) {
            console.log(error);
        }

        initSequelize();
        client.end();
    });
});

export const getAllMovies = async () => {
    const sequelize = new Sequelize(sequelizeConnectionString);

    const Movie = await getMovieModel(sequelize);
    const movies = await Movie.findAll();

    sequelize.close();

    return movies;
}

const initSequelize = async () => {
    const sequelize = new Sequelize(sequelizeConnectionString)

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await getMovieModel(sequelize);

        await sequelize.sync({ alter: true });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    sequelize.close();
}
