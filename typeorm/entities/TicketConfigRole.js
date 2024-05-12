const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "ticket_config_roles",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    roleId: {
      type: "varchar",
    },
  },
  relations: {
    ticketConfig: {
      target: "ticket_configs",
      type: "many-to-one",
      joinColumn: { name: "roleId" },
    },
  },
});
