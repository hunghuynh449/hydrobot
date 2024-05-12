const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  ButtonComponent,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vvip")
    .setDescription("Display embed builder [GUIDE]")
    .setDefaultMemberPermissions(
      PermissionFlagsBits.UseApplicationCommands |
        PermissionFlagsBits.ReadMessageHistory
    )
    .setDMPermission(false),

  async execute(client, interaction) {
    try {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            // .setAuthor({
            //   name: "Hydro",
            //   iconURL: client.user.displayAvatarURL(),
            // })
            .setColor("Blurple")
            //max 256 characters
            .setTitle("ROLE BOOKING")
            //max 4096 characters
            // .setDescription("Đây là mô tả")
            // .setImage(
            //   "https://st.nhattruyenmin.com/data/comics/203/mat-the-quat-khoi.jpg"
            // )
            // .setThumbnail(
            //   "https://st.nhattruyenmin.com/data/comics/235/ta-troi-sinh-da-la-nhan-vat-phan-dien-3659.jpg"
            // )
            .addFields(
              // max embed field name are limited to 256 characters and value to 1024 characters
              {
                name: "Đẳng cấp (100h)",
                value: "Quyền gửi ảnh \nMột role riêng \nFree 1h booking",
                inline: false,
              },
              {
                name: "Đại Gia: (500h)",
                value:
                  "Một room riêng full quyền\n Được giảm 20% booking vào những ngày đặc biệt\n Free 3h booking",
                inline: false,
              },
              {
                name: "Triệu Phú: (1000h)",
                value:
                  "Free tiền về server hoặc thêm người\n Một con bot nhạc riêng\n Free 4h booking",
                inline: false,
              },
              {
                name: "Tỷ Phú: (3000h)",
                value:
                  "Quyền mute, di chuyển người\n Được tham gia nội bộ server\n Được vinh danh\n Free 5h booking",
                inline: false,
              }
            ), //you can add field up to 25 fields
          // .setFooter({
          //   // max embed footer text are limited to 2048 characters
          //   text: "Đây là footer",
          //   iconURL: client.user.displayAvatarURL(),
          // })
          // .setTimestamp(),
        ],
        components: [
          new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("createBooking")
              .setEmoji("🎫")
              .setLabel("Book")
              .setStyle(ButtonStyle.Primary)
          ),
        ],
      });
    } catch (err) {
      console.log(err);
    }
  },
};
