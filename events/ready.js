const client = require("../index");

const colors = require('../packages/console.js');
const { table } = require('table');

client.once("ready", async() => {
    global.startSpinner.succeed();

    // let servers = 0;
    // let users = 0;

    // client.guilds.forEach(guild => {
        // servers++

        // users = users + guild.members.size;
    // });

    console.log(table([
        [`${colors.fgGray("Connected To")} ${colors.fgYellow(`${client.user.username}`)}`],
        // [`${colors.fgWhite("Watching")} ${colors.fgRed(`${users}`)} ${colors.fgWhite(`${users > 1 ? "Users + Bots," : "User,"}`)} ${colors.fgRed(`${servers}`)} ${colors.fgWhite(`${servers > 1 ? "Servers." : "Server."}`)}`],
        [`${colors.fgWhite(`MongoDB:`)} ${global.mongoStatus} ${colors.fgWhite("||")} ${colors.fgWhite(`Prefix:` + colors.fgRed(` ${client.config.bot.info.prefix}`))} ${colors.fgWhite("||")} ${colors.fgRed(client.commands.size)} ${colors.fgWhite(`Commands`)}`],
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

    client.updateUserStatus(client.user.id, {
        content: client.config.bot.status.text,
        emoteId: client.config.bot.status.emoji
    });

    global.mongoStatus = true;
});