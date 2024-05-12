const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avserver")
    .setDescription("Xem avatar server")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.UseApplicationCommands |
        PermissionFlagsBits.ReadMessageHistory
    )
    .setDMPermission(false),

  async execute(client, interaction) {
    const guildIcon = interaction.member.guild.icon;
    const guildId = interaction.member.guild.id;
    const url = `https://cdn.discordapp.com/icons/${guildId}/${guildIcon}.png`;
    const embedResponse = new EmbedBuilder().setImage(`${url}`);

    console.log("interaction.member.guild", interaction.member.guild);
    try {
      interaction.reply({
        ephemeral: false,
        embeds: [embedResponse],
      });
    } catch (err) {
      console.log(err);
    }
  },
};
