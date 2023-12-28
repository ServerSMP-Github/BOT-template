const client = require("../index");

client.on("messageCreate", async (message) => {

  if (typeof message.content != "string" || message.member.user.bot || !message.server) return;

  const prefix = client.config.bot.info.prefix;

  if (message.content.match(new RegExp(`<@${client.user.id}>`))) return message.channel.sendMessage(`Prefix: \`${prefix}\``);

  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(" ");

  const command = client.commands.get(cmd.toLowerCase()) || Array.from(client.commands.values()).find(c => c.aliases?.includes(cmd.toLowerCase()));
  if (!command) return;

  if(command.userPermission && !message.member.hasPermission(message.channel.server, command.userPermission || [])) return message.channel.sendMessage("You do not have permission to use this command!");
  if(command.botPermission && !message.server.havePermission(command.botPermission || [])) return message.channel.sendMessage("I do not have permission to use this command!");

  if (command.owner && !client.config.bot.owner.includes(message.authorId)) return message.channel.sendMessage("This command can only be used by the owners!");

  await command.run(client, message, args);

});
