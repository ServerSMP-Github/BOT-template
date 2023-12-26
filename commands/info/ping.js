const { Client, Message } = require("touchguild");

module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const circles = { green: "🟢", yellow: "🟡", red: "🔴" };

        const days = Math.floor(client.uptime / 86400000);
        const hours = Math.floor(client.uptime / 3600000) % 24;
        const minutes = Math.floor(client.uptime / 60000) % 60;
        const seconds = Math.floor(client.uptime / 1000) % 60;

        const botLatency = new Date() - message.createdAt
        const apiLatency = client.ws.latency;

        message.createMessage({
            embeds: [
                {
                    fields: [
                        {
                            name: "Bot Latency",
                            value: `${botLatency <= 200 ? circles.green : botLatency <= 400 ? circles.yellow : circles.red} ${botLatency}ms`
                        },
                        {
                            name: "API Latency",
                            value: `${apiLatency <= 200 ? circles.green : apiLatency <= 400 ? circles.yellow : circles.red} ${apiLatency}ms`
                        },
                        {
                            name: "Client Uptime",
                            value: `${days}d ${hours}h ${minutes}m ${seconds}s`
                        },
                    ]
                }
            ]
        })
    },
};
