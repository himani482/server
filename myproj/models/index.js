const CONFIG = require('../config/config.json')['postgresDB'];

var reconnectOptions = {
  max_retries: CONFIG.maxreconnect,
  onRetry: function(count) {
    console.log("connection lost, trying to reconnect (" + count + ")");
  }
};

var Sequelize = require('sequelize');
var connection = new Sequelize(CONFIG.database, CONFIG.username, CONFIG.password, {
  host: CONFIG.host,
  dialect: CONFIG.dialect,
  reconnect: reconnectOptions || true,
  autoreconnect: true,
  pool: CONFIG.pool
});

connection.options.logging = () => {};
var db = {};

connection.sync();
connection.authenticate()
  .then(() => {
    console.log("Postgres Connected!")
  })
  .catch((err) => {
    console.log("Failed ", err)
  })
db.sequelize = connection;
db.Sequelize = Sequelize;

db.postSchema = require('./postSchema')(connection,Sequelize);

module.exports = db;