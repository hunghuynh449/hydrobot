const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fake")
    .setDescription("Gửi tin nhắn ẩn danh")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Nhập tin nhắn")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    try {
      switch (interaction.commandName) {
        case "fake":
          const message = interaction.options.getString("message");
          if (message) {
            await interaction.channel.send(message);
            console.log(
              `${interaction.member.user.username} đã gửi "${message}"`
            );
            await interaction.reply({
              content: "Đã gửi tin nhắn.",
              ephemeral: true,
            });
          }

          break;

        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
