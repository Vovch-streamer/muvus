import { getAllMovies } from "./movies.model.js";

export const moviesResolver = async () => await getAllMovies();
