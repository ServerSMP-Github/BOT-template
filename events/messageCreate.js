const { EmbedBuilder, Events } = require('discord.js');
const client = require("../index");

client.on(Events.MessageCreate, async (message) => {

  if (message.author.bot || !message.guild) return;

  const prefix = await client.config.bot.info.prefix;

  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) return message.channel.send({ content: `Prefix: \`${prefix}\`` });

  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(" ");

  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

  if (command) {

    if(!message.member.permissions.has(command.userPermission || [])) return message.channel.send("You do not have permission to use this command!");
    if(!message.guild.members.me.permissions.has(command.botPermission || [])) return message.channel.send("I do not have permission to use this command!");

    if (command.owner && !client.config.bot.owner.includes(message.author.id)) return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Red")
          .setDescription("This command can only be used by the owners!")
      ]
    });

    await command.run(client, message, args);

  } else return;
});
