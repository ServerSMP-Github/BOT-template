const { Client } = require("revolt.js");

module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    /**
     *
     * @param {Client} client
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const circles = { green: "🟢", yellow: "🟡", red: "🔴" };
        
        const now = Date.now();

        const msg = await message.channel.sendMessage("Pinging...");

        const botLatency = Date.now() - now;

        msg.edit({ content: `The bots latency is: ${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency}ms` }); 
    },
};
