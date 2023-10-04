const { EmbedBuilder, WebhookClient } = require("discord.js");
const colors = require('../packages/console.js');

module.exports = (client) => {

  process.on('unhandledRejection', (reason, p) => {
    console.log(`[${colors.fgRed('error')}] ${colors.fgBlue('[antiCrash.js]')} ${colors.fgRed('Unhandled rejection/crash detected.')}`);
    console.log(`[${colors.fgRed('error')}] ${reason}`, p ? p : "");
  });

  process.on("uncaughtException", (err, origin) => {
    console.log(`[${colors.fgRed('error')}] ${colors.fgBlue('[antiCrash.js]')} ${colors.fgRed('Uncaught exception/catch detected.')}`);
    console.log(`[${colors.fgRed('error')}] ${err}`, origin ? origin : "");
  });

  process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(`[${colors.fgRed('error')}] ${colors.fgBlue('[antiCrash.js]')} ${colors.fgRed('Uncaught exception/catch detected. (Monitor)')}`);
    console.log(`[${colors.fgRed('error')}] ${err}`, origin ? origin : "");
  });

};
