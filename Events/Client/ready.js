const { Client, version } = require("discord.js");

const { author } = require("../../package.json");
const color = require("colors");

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    console.log(
      `${color.bold.green([`READY`])}` + `Logging into Discord...`.yellow
    );
    client.user.setPresence({
      activities: [
        {
          name: "mẹ mày",
        },
      ],
      status: "online",
    });
    console.table({
      Name: client.user.tag,
      Author: `${author}`,
      Users: client.users.cache.size,
      Channels: client.channels.cache.size,
      "Slash Commands": client.slashCommands.size,
      Envents: client.events.size,
    });
    console.log(
      `${color.bold.green([`READY`])}` + `${client.user.tag} is online`.yellow
    );
  },
};
