import * as log4js from "log4js";
import {Client} from "discord.js";
import * as dotenv from "dotenv";
import {Command} from "./types/Command";
import {CreateIssue} from "./commands/CreateIssue";

// init logger
let logger = log4js.getLogger("bootstrap");
logger.level = "debug";

dotenv.config()

logger.info("Starting App");

// @TODO move to config
let PREFIX = "!";

// Add command objects to map for later lookup
let commandMap = new Map<String, Command>();
commandMap.set("issue", new CreateIssue());


logger.info("Commands loaded");

// Start discord client + event handlers
let client: Client = new Client();

//Bot login
client.login().then(() => {
    logger.info(`logged in as ${client.user?.tag}!`)
});

logger.info("Client init");

client.on("ready", () => {
    logger.info("discord client ready");
    console.log("ready")
})

// Crash reporting
client.on('disconnect', () => logger.error('Connection Lost...'));
client.on('error', error => logger.error(error));
client.on('warn', info => logger.error(info));

// dynamic command lookup
client.on("message", message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) {
        return;
    }

    let args: String[] = message.content.slice(PREFIX.length).split(/ +/);
    let command: String = args.shift()!.toLowerCase();

    if (commandMap.has(command)) {
        logger.debug(`processing action for: ${command}`);
        commandMap.get(command)!.execute(message, args);
    }
});

logger.info("Events setup");