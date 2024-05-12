const { DataSource } = require("typeorm");
const Ticket = require("./entities/Ticket");
const TicketConfig = require("./entities/TicketConfig");
const TicketConfigRole = require("./entities/TicketConfigRole");

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_DB_HOST,
  port: parseInt(process.env.MYSQL_DB_PORT || 3306),
  username: process.env.MYSQL_DB_NAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_DATABASE,
  synchronize: true,
  entities: [Ticket, TicketConfig, TicketConfigRole],
});

module.exports = { AppDataSource };
