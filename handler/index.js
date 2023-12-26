const { getFileList } = require("../packages/files.js");
const { Client } = require("revolt.js");

/**
 * @param {Client} client
 */
module.exports = async (client) => {
    // Commands
    const commandFiles = await getFileList(`${process.cwd()}/commands`, { type: ".js", recursively: true, maxDepth: 1 });
    commandFiles.map((value) => {
        const file = require(value);
        const splitted = value.split("/");
        const directory = splitted[splitted.length - 2];

        if (file.name) {
            const properties = { directory, ...file };
            client.commands.set(file.name, properties);
        }
    });

    // Events
    const eventFiles = await getFileList(`${process.cwd()}/events`, { type: ".js", recursively: false });
    eventFiles.map((value) => require(value));

};
