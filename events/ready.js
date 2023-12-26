const client = require("../index");

const colors = require('../packages/console.js');
const { table } = require('table');

client.once("ready", async() => {
    global.startSpinner.succeed();

    let servers = 0;
    let users = 0;

    await Promise.all(client.servers.map(async (server) => {
        servers++;

        const members = await server.fetchMembers();
        users = users + members.users.length;
    }));

    console.log(table([
        [`${colors.fgGray("Connected To")} ${colors.fgYellow(`${client.user.username}`)}`],
        [`${colors.fgWhite("Watching")} ${colors.fgRed(`${users}`)} ${colors.fgWhite(`${users > 1 ? "Users + Bots," : "User,"}`)} ${colors.fgRed(`${servers}`)} ${colors.fgWhite(`${servers > 1 ? "Servers." : "Server."}`)}`],
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

    client.api.patch("/users/@me", {
        status: {
            text: client.config.bot.status.text,
            presence: client.config.bot.status.status
        }
    });

    global.mongoStatus = true;
});