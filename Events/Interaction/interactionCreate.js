const {
  ChatInputCommandInteraction,
  Client,
  ActionRowBuilder,
  ButtonBuilder,
  ChannelType,
  ButtonStyle,
} = require("discord.js");

const color = require("colors");
const { AppDataSource } = require("../../typeorm");
const TicketConfig = require("../../typeorm/entities/TicketConfig");
const Ticket = require("../../typeorm/entities/Ticket");

const ticketConfigRepository = AppDataSource.getRepository(TicketConfig);
const ticketRepository = AppDataSource.getRepository(Ticket);

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      if (interaction.user.bot) return;
      const command = client.slashCommands.get(interaction.commandName);
      if (!command) {
        interaction.reply({
          ephemeral: true,
          content: "This command is outdated!",
        });
      }
      try {
        command.execute(client, interaction);
      } catch (err) {
        console.log(
          `${color.bold.red(`[INTERACTION ? CREATE : ERROR]`)}` + `${err}`.bgRed
        );
      }
    } else if (interaction.isButton()) {
      if (interaction.user.bot) return;
      const { guild, guildId, channelId } = interaction;

      const ticketConfig = await ticketConfigRepository.findOneBy({
        guildId,
      });

      console.log("ticketConfig", ticketConfig);
      if (!ticketConfig) {
        console.log("Không có ticket tồn tại.");
        return;
      }

      console.log("interaction.customId", interaction.customId);
      const buttonID = interaction.customId;
      switch (buttonID) {
        case "createBooking":
          try {
            if (!guild) {
              console.log("Guild hiện đang Null");
              return;
            }
            // Check if user has an existing ticket.
            const ticket = await ticketRepository.find({
              createdBy: interaction.user.id,
              status: "opened",
            });
            console.log("list ticket", ticket);
            // if (ticket) {
            //   await interaction.reply({
            //     content: "Hiện tại bạn đã có 1 ticket!",
            //     ephemeral: true,
            //   });
            //   return;
            // }
            // if (ticketConfig.messageId === interaction.message.id) {
            console.log("User clicked on the button on the correct msg");
            const newTicket = ticketRepository.create({
              createdBy: interaction.user.id,
            });
            const savedTicket = await ticketRepository.save(newTicket);

            // const rolePermissions = ticketConfig.ticketConfigRoles.map(
            //   (role) => ({
            //     allow: ["ViewChannel", "SendMessages"],
            //     id: role.roleId,
            //   })
            // );

            const newTicketChannel = await guild.channels.create({
              name: `ticket-${interaction.user.username}-${interaction.user.discriminator}`,
              type: ChannelType.GuildText,
              parent: "1115280569270534166",
              permissionOverwrites: [
                {
                  allow: ["ViewChannel", "SendMessages"],
                  id: interaction.user.id,
                },
                {
                  allow: ["ViewChannel", "SendMessages"],
                  id: client.user.id,
                },
                {
                  deny: ["ViewChannel", "SendMessages"],
                  id: guildId,
                },
                // ...rolePermissions,
              ],
            });
            const newTicketMessage = await newTicketChannel.send({
              content: "Tạo ticket được rồi mừng vãi cả lon",
              components: [
                new ActionRowBuilder().setComponents(
                  new ButtonBuilder()
                    .setCustomId("closeTicket")
                    .setStyle(ButtonStyle.Danger)
                    .setLabel("Close Ticket")
                ),
              ],
            });
            await ticketRepository.update(
              { id: savedTicket.id },
              {
                messageId: newTicketMessage.id,
                channelId: newTicketChannel.id,
                status: "opened",
              }
            );
            console.log("Đã cập nhật thông tin ticket.");
            console.log({
              id: savedTicket.id,
              messageId: newTicketMessage.id,
              channelId: newTicketChannel.id,
            });
            await interaction.reply({
              content: "Đã tạo ticket thành công!",
              ephemeral: true,
            });
            // }
          } catch (err) {
            console.log(err);
          }
          break;

        case "closeTicket":
          try {
            if (!guild) {
              console.log("Guild hiện đang Null");
              return;
            }

            // get id of current ticket by channelId
            const ticket = await ticketRepository.findOneBy({
              createdBy: interaction.user.id,
              channelId: channelId,
              status: "opened",
            });

            const resTicket = await ticketRepository.delete({ id: ticket.id });

            if (resTicket.affected) {
              // affected = 1 = success
              const resChannels = await guild.channels.delete(channelId);
            } else {
              await interaction.reply({
                content: "Xóa ticket thất bại!",
                ephemeral: true,
              });
            }
          } catch (err) {
            console.log(err);
          }
          break;

        default:
          break;
      }
    }
  },
};
