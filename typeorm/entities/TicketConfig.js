const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "ticket_configs",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    guildId: {
      type: "varchar",
      unique: true,
    },
    messageId: {
      type: "varchar",
    },
    channelId: {
      type: "varchar",
    },
  },
  relations: {
    ticketConfigRoles: {
      target: "ticket_config_roles",
      type: "one-to-many",
      inverseSide: "roleId",
    },
  },
});
