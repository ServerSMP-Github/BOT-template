const config = require("./settings.json");
const { Client } = require("touchguild");

global.startSpinner = require("./packages/console").createSpinner("Starting BOT");
global.startSpinner.start();

const client = new Client({ token: config.bot.info.token });

module.exports = client;

client.commands = new Map();
client.config = config;

if (!config.bot.info.debug) require("./packages/anticrash.js")();

const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect(config.database.mongodb);

global.mongoStatus = null;
const colors  = require("./packages/console.js");
mongoose.connection.on("connected", () => global.mongoStatus === true ? console.log(`${colors.fgWhite("MongoDB")} ${colors.fgGreen("√")}`) : global.mongoStatus = colors.fgGreen("√"));
mongoose.connection.on("disconnected", () => global.mongoStatus === true ? console.log(`${colors.fgWhite("MongoDB")} ${colors.fgRed("×")}`) : global.mongoStatus = colors.fgRed("×"));
mongoose.connection.on("error", (err) => console.log(err));

require("./handler")(client);

client.connect();