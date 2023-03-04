import { getMovieModel } from "./models/Movie.js";
import { initModule } from "../db.js";

initModule(getMovieModel);
