import { defineUserModel } from "./models/User.js";
import { initModule } from "../db.js";

initModule(defineUserModel);
