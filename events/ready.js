const { Events } = require("discord.js");
const client = require("../index");

const colors = require('../packages/console.js');
const { table } = require('table');

client.once(Events.ClientReady, async() => {
    const cmdCount = client.commands.size + client.slashCommands.size;

    global.startSpinner.succeed();

    console.log(table([
        [`${colors.fgGray("Connected To")} ${colors.fgYellow(`${client.user.username}`)}`],
        [`${colors.fgWhite("Watching")} ${colors.fgRed(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`)} ${colors.fgWhite(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Users + Bots," : "User,"}`)} ${colors.fgRed(`${client.guilds.cache.size}`)} ${colors.fgWhite(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)}`],
        [`${colors.fgWhite(`MongoDB:`)} ${global.mongoStatus} ${colors.fgWhite("||")} ${colors.fgWhite(`Prefix:` + colors.fgRed(` ${client.config.bot.info.prefix}`))} ${colors.fgWhite("||")} ${colors.fgRed(cmdCount)} ${colors.fgWhite(`Commands`)}`],
    ], {
        columnDefault: {
            width: 50,
        },
        header: {
            alignment: 'center',
            content: `${colors.fgCyan(
                [
                    `╔═══╗                  ╔═══╗╔═╗╔═╗╔═══╗`,
                    `║╔═╗║                  ║╔═╗║║║╚╝║║║╔═╗║`,
                    `║╚══╗╔══╗╔═╗╔╗╔╗╔══╗╔═╗║╚══╗║╔╗╔╗║║╚═╝║`,
                    `╚══╗║║╔╗║║╔╝║╚╝║║╔╗║║╔╝╚══╗║║║║║║║║╔══╝`,
                    `║╚═╝║║║═╣║║ ╚╗╔╝║║═╣║║ ║╚═╝║║║║║║║║║   `,
                    `╚═══╝╚══╝╚╝  ╚╝ ╚══╝╚╝ ╚═══╝╚╝╚╝╚╝╚╝   `
                ].join('\n'),
            )}\n${colors.bold(colors.fgGreen("Success!"))}`,
        }
    }));

    global.mongoStatus = true;
});