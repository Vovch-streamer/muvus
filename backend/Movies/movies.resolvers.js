import { getAllMovies } from "./movies.service.js";

export const moviesResolver = async () => await getAllMovies();
