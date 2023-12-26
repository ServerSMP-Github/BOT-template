const { Message } = require("touchguild");
const client = require("../index");

/**
 *
 * @param {Message} message
 */
client.on("messageCreate", async (message) => {

  if (message.member.bot || !message.guild) return;

  const prefix = client.config.bot.info.prefix;

  if (message.content.match(new RegExp(`@${client.user.username}`))) return message.createMessage({ content: `Prefix: \`${prefix}\`` });

  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const [cmd, ...args] = message.content
      .slice(prefix.length)
      .trim()
      .split(" ");

  const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
  if (!command) return;

  // if(!message.member.permissions.has(command.userPermission || [])) return message.createMessage({ content: "You do not have permission to use this command!" });
  // if(!message.guild.members.me.permissions.has(command.botPermission || [])) return message.createMessage({ content: "I do not have permission to use this command!" });

  if (command.owner && !client.config.bot.owner.includes(message.memberID)) return message.createMessage({
    embeds: [
      {
        description: "This command can only be used by the owners!",
        color: 3093151
      }
    ]
  });

  await command.run(client, message, args);

});
