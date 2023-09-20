const { ActivityType } = require("discord.js");

module.exports = (config) => {
    const statusType = config.bot.status.type.toLowerCase();

    global.statusType = null;

    if (statusType === 'watching') global.statusType = ActivityType.Watching
    else if (statusType === 'listening') global.statusType = ActivityType.Listening;
    else if (statusType === 'playing') global.statusType = ActivityType.Playing;
    else if (statusType === 'streaming') global.statusType = ActivityType.Streaming;
    else if (statusType === 'competing') global.statusType = ActivityType.Competing;
    else if (statusType === 'custom') global.statusType = ActivityType.Custom;
}