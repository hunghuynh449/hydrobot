const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { AppDataSource } = require("../../typeorm");
const TicketConfig = require("../../typeorm/entities/TicketConfig");

const ticketConfigRepository = AppDataSource.getRepository(TicketConfig);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Gửi tin nhắn đến một kênh để tạo Ticket")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel mà bạn muốn gửi tới")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    ),

  async execute(client, interaction) {
    try {
      switch (interaction.commandName) {
        case "ticket":
          const guildId = interaction.guildId;
          console.log(interaction);
          console.log(guildId);
          const channel = interaction.options.getChannel("channel");
          const ticketConfig = await ticketConfigRepository.findOneBy({
            guildId,
          });

          const messageOptions = {
            embeds: [
              new EmbedBuilder()
                .setAuthor({
                  name: "Ticket system",
                  iconURL: client.user.displayAvatarURL(),
                })
                .setColor("Blurple")
                .setTitle("TẠO TICKET TẠI ĐÂY!"),
            ],
            components: [
              new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                  .setCustomId("createBooking")
                  .setEmoji("🎫")
                  .setLabel("Book")
                  .setStyle(ButtonStyle.Primary)
                // new ButtonBuilder()
                //   .setCustomId("createSupport")
                //   .setEmoji("💬")
                //   .setLabel("Support")
                //   .setStyle(ButtonStyle.Secondary)
              ),
            ],
          };

          try {
            if (!ticketConfig) {
              const msg = await channel.send(messageOptions);
              const newTicketConfig = ticketConfigRepository.create({
                guildId,
                messageId: msg.id,
                channelId: channel.id,
              });
              await ticketConfigRepository.save(newTicketConfig);
              await interaction.reply({
                content: `Đã tạo ticket!`,
                ephemeral: true,
              });
            } else {
              const msg = await channel.send(messageOptions);
              ticketConfig.channelId = channel.id;
              ticketConfig.messageId = msg.id;
              await ticketConfigRepository.save(ticketConfig);
              await interaction.reply({
                content: `Một tin nhắn mới được gửi vào ${channel}. Đã cập nhật dữ liệu.`,
                ephemeral: true,
              });
            }
          } catch (error) {
            await interaction.reply({
              content: `Đã xảy ra lỗi...`,
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
