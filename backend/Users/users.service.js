import crypto from "crypto";
import { Sequelize } from "sequelize";
import { sequelizeConnectionString } from "../db.js";
import { defineUserModel } from "./models/User.js";

export const authenticateUser = async (login, outerHash, callback) => {
  try {
    const sequelize = new Sequelize(sequelizeConnectionString);

    const UserModel = await defineUserModel(sequelize);
    const user = await UserModel.findOne({
      where: { login },
    });

    sequelize.close();

    crypto.pbkdf2(
      outerHash,
      // TODO: REMOVE!
      user?.salt || "123",
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return callback(err);
        }

        if (!crypto.timingSafeEqual(user.hashedPassword, hashedPassword)) {
          return callback(null, false, {
            message: "Incorrect username or password.",
          });
        }

        return callback(null, user);
      }
    );
  } catch (error) {
    console.error(error);
    return callback(null, false, {
      message: "Incorrect username or password.",
    });
  }
};
// login
// hashedPassword
// salt
export const registerUser = async (req, res, next) => {
  var salt = crypto.randomBytes(16);
  await crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }

      const sequelize = new Sequelize(sequelizeConnectionString);

      const UserModel = await defineUserModel(sequelize);
      await UserModel.build({
        login: req.body.username,
        hashedPassword,
        salt,
      }).save();

      sequelize.close();

      var user = {
        username: req.body.username,
      };

    //   req.login(user, function (err) {
    //     if (err) {
    //       return next(err);
    //     }
    //     res.redirect("/");
    //   });
    }
  );
};

// function verify(username, password, cb) {
//   db.get(
//     "SELECT * FROM users WHERE username = ?",
//     [username],
//     function (err, row) {
//       if (err) {
//         return cb(err);
//       }
//       if (!row) {
//         return cb(null, false, { message: "Incorrect username or password." });
//       }

//       crypto.pbkdf2(
//         password,
//         row.salt,
//         310000,
//         32,
//         "sha256",
//         function (err, hashedPassword) {
//           if (err) {
//             return cb(err);
//           }
//           if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
//             return cb(null, false, {
//               message: "Incorrect username or password.",
//             });
//           }
//           return cb(null, row);
//         }
//       );
//     }
//   );
// }
