const { EmbedBuilder, ApplicationCommandOptionType, InteractionType, Events } = require("discord.js");
const client = require("../index");

client.on(Events.InteractionCreate, async (interaction) => {

  if (!interaction.guild) return interaction.followUp({ content: "You have to be in a guild to use slash commands!" });

  // Slash Command Handling
  if (interaction.type === InteractionType.ApplicationCommand) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);

    if (cmd) {

      const args = [];

      for (let option of interaction.options.data) {
        if (option.type === ApplicationCommandOptionType.Subcommand) {
          if (option.name) args.push(option.name);
          option.options?.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }

      interaction.member = interaction.guild.members.cache.get(interaction.user.id);

      if (!interaction.member.permissions.has(cmd.userPermissions || [])) return interaction.followUp({ content: "You do not have permissions to use this command!", ephemeral: true });

      if (!interaction.guild.members.me.permissions.has(cmd.botPermission || [])) return interaction.followUp({ content: "I do not have permission to use this command!", ephemeral: true });

      if (cmd.owner && !client.config.bot.owner.includes(interaction.member.user.id)) return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription("This command can only be used by the owners!")
        ]
      });

      return cmd.run(client, interaction, args);
    }
  }

  // Context Menu Handling
  if (interaction.isContextMenuCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const command = client.slashCommands.get(interaction.commandName);
    if (command) return command.run(client, interaction);
  }
});