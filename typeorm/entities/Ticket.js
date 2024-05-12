const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "ticket",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    messageId: {
      type: "varchar",
      nullable: true,
    },
    channelId: {
      type: "varchar",
      nullable: true,
    },
    createdBy: {
      type: "varchar",
    },
    status: {
      type: "varchar",
      default: "created",
    },
  },
});
