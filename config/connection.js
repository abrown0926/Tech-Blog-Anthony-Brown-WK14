const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
  sequelize
    .authenticate()
    .then(() => {
      console.log("connected");
    })
    .catch((err) => {
      console.log("error connecting");
      console.log(err);
    });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: "localhost",
      dialect: "mysql",
      database: "tech_blog_db",
      port: 3306,
    }
  );
}

module.exports = sequelize;
