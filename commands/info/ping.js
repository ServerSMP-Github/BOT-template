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

        const botLatency = Date.now() - message.createdAt;

        message.channel.sendMessage({
            embeds: [
                {
                    colour: "#ff0000",
                    description: `**Bot Latency**\n${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency}ms`
                }
            ]
        });
    },
};
