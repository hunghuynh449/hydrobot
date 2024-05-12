const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

const figures = [
  { name: "Tôm", icon: "<:tom:1239239075651915857>", percent: 16.6666 },
  { name: "Cá", icon: "<:ca:1239239066180915350>", percent: 16.6666 },
  { name: "Cua", icon: "<:cua:1239239068651356250>", percent: 16.6666 },
  { name: "Bầu", icon: "<:bau:1239239063215804516>", percent: 16.6666 },
  { name: "Gà", icon: "<:ga:1239239070341927003>", percent: 16.6666 },
  { name: "Nai", icon: "<:nai:1239239072984076409>", percent: 16.6666 },
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bc")
    .setDescription("Random bầu cua")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),
  async execute(client, interaction) {
    try {
      switch (interaction.commandName) {
        case "bc":
          // Lấy ngẫu nhiên một phần tử trong danh sách figures theo tỉ lệ
          const randomFigure = () => {
            const value = Math.random() * 100;
            let sum = 0;
            let element;
            for (var i = 0; i < figures.length; i++) {
              sum += figures[i].percent;
              if (sum > value) {
                element = figures[i];
                break;
              }
            }
            return element;
          };

          let wins = [];
          wins = [randomFigure(), randomFigure(), randomFigure()];
          await interaction.channel.send(
            `${wins[0].icon} ${wins[1].icon} ${wins[2].icon} \n**${wins[0].name} ${wins[1].name} ${wins[2].name}**`
          );

          await interaction.reply({
            content: "Đã xốc xong.",
            ephemeral: true,
          });

          break;

        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  },
};
