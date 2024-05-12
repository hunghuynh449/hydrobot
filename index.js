const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
} = require("discord.js");
const color = require("colors");
const Cluster = require("discord-hybrid-sharding");
const { Player } = require("discord-player");
require("dotenv").config();
require("reflect-metadata");
const { AppDataSource } = require("./typeorm");

//====================< Function only >===================\\
const { loadEvents } = require("./Structures/Handlers/Loaders/loadEvents.js");
const {
  loadCommands,
} = require("./Structures/Handlers/Loaders/loadCommands.js");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = "1112965404348919819";
const GUILD_ID = "973932101198032916";

// const client = new Client({
//   intents: ["Guilds", "GuildMessages"],
// });

const rest = new REST({ version: "10" }).setToken(TOKEN);
const client = new Client({
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
  fetchAllMembers: true,
  //   shards: Cluster.data.SHARDS_LIST,
  //   shardCount: Cluster.data.TOTAL_SHARDS,
});

//====================< Collection >===================\\
client.commands = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();

// Add the player on the client
client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

// client.cluster = new Cluster.Client(client);

//====================< Handlers >===================\\
const handlerz = [];

handlerz.forEach((handler) => {
  require(`./Structures/Handlers/${handler}`);
});

//====================< Login >===================\\

main();
async function main() {
  try {
    const dataSource = await AppDataSource.initialize();
    client
      .login(TOKEN)
      .then(() => {
        loadEvents(client, color);
        loadCommands(client, color);

        client.on("messageCreate", (msg) => {
          console.log(msg.author.username + " " + msg.content);
          if (msg.content.toLowerCase().includes("hydro")) {
            msg.channel.send("Nhắc tao cái chó gì ?");
          }
          if (msg.content.toLowerCase().includes("<@385090248037629963>")) {
            return msg.channel.send("Nhắc tao cái chó gì ?");
          }
          switch (msg.content.toLowerCase()) {
            case "ping":
              msg.channel.send(`Pong ${new Date() - msg.createdTimestamp}ms`);
              break;
          }
        });
      })
      .catch((err) => {
        console.log(`${color.rgb(`[INDEX ERROR]`)} ` + `${err}`.bgRed);
      });
  } catch (error) {
    console.log(error);
  }
}
