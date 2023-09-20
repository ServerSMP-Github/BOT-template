const { Client, Collection, GatewayIntentBits, Partials, ActivityType } = require("discord.js");
const config = require("./settings.json");

require("./packages/status.js")(config);

global.startSpinner = require("./packages/console").createSpinner("Starting BOT");
global.startSpinner.start();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
    ],
    presence: {
        activities: [{
            name: config.bot.status.text ? config.bot.status.text : "Starting!",
            type: global.statusType,
        }],
        status: config.bot.status.status
    }
});

module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = config;

if (!config.bot.info.debug) require("./packages/anticrash.js")(client);

const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect(config.database.mongodb);

global.mongoStatus = null;
const colors  = require("./packages/console.js");
mongoose.connection.on("connected", () => global.mongoStatus === true ? console.log(`${colors.fgWhite("MongoDB")} ${colors.fgGreen("√")}`) : global.mongoStatus = colors.fgGreen("√"));
mongoose.connection.on("disconnected", () => global.mongoStatus === true ? console.log(`${colors.fgWhite("MongoDB")} ${colors.fgRed("×")}`) : global.mongoStatus = colors.fgRed("×"));
mongoose.connection.on("error", (err) => console.log(err));

require("./handler")(client);

client.login(config.bot.info.token);