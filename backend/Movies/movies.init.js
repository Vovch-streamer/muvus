import { defineMovieModel } from "./models/Movie.js";
import { initModule } from "../db.js";

initModule(defineMovieModel);
